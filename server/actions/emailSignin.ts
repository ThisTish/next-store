'use server'
import LoginSchema from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"
import { signIn } from "@/server/auth"
import { AuthError } from "next-auth"


const actionClient = createSafeActionClient()

export const emailSignin = actionClient
	.schema(LoginSchema)
	.action( async ({parsedInput: {email, password, code}}) =>{
	try {
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, email)
			})
	
			if(!existingUser){
				return {error: "User not found"}
			}
	
			if(existingUser.email !== email){
				return {error: "Email not found"}
			}
			if(!existingUser.emailVerified){
				const verificationToken = await generateEmailVerificationToken(existingUser.email)
				await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
				return {error: "Email is not verified, check your email for a new verification link"}
			}
			
			await signIn('credentials', {
				email,
				password,
				redirect: false
			})
	
			return {success: 'Login Successful', email}
	} catch (error) {
		console.log(error)
		if(error instanceof AuthError){
			switch(error.type){
				case 'CredentialsSignin': {
					return {error: 'Invalid credentials'}
				}
				default: {
					return {error: 'An error occurred'}
				}
			}
		}
	}

	})
	

