'use server'
import LoginSchema from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"
import { generateEmailVerificationToken, generateTwoFactorToken, getTwoFactorTokenByEmail } from "./tokens"
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from "./email"
import { signIn } from "@/server/auth"
import { AuthError } from "next-auth"
import { existingUserByEmail } from "./existingUser"
import { db } from ".."
import { twoFactorTokens } from "../schema"
import { eq } from "drizzle-orm"


const actionClient = createSafeActionClient()

export const emailSignin = actionClient
	.schema(LoginSchema)
	.action(async ({ parsedInput: { email, password, code } }) => {
		try {
			const existingUser = await existingUserByEmail(email)

			if ('email' in existingUser && existingUser.email !== email) {
				return { error: "Email not found" }
			}

			if ('emailVerified' in existingUser && !existingUser.emailVerified) {
				if (existingUser.email) {
					const verificationToken = await generateEmailVerificationToken(existingUser.email)
					await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
				} else {
					return { error: "Email is not valid" }
				}
				return { success: "Email is not verified, check your email for a new verification link" }
			}

			if ('twoFactorEnabled' in existingUser && existingUser.twoFactorEnabled && existingUser.email) {
				if (code) {
					const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
					if (!twoFactorToken || twoFactorToken.token != code) return { error: 'Invalid code' }

					const hasExpired = new Date(twoFactorToken.expires) < new Date()
					if (hasExpired) return { error: 'Code has expired' }

					await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, twoFactorToken.id))
				}else{

					const token = await generateTwoFactorToken(existingUser.email)
					if (!token) return { error: 'An error occurred' }
					await sendTwoFactorTokenByEmail(token[0].email, token[0].token)
					return { twoFactor: 'Two factor code sent to email' }
				}
			}

			await signIn('credentials', {
				email,
				password,
				redirect: false
			})
			return { success: 'Login Successful', email }

		} catch (error) {
			console.log(error)
			if (error instanceof AuthError) {
				switch (error.type) {
					case 'CredentialsSignin': {
						return { error: 'Invalid credentials' }
					}
					default: {
						return { error: 'An error occurred' }
					}
				}
			}
		}

	})


