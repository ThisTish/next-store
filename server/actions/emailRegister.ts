'use server'

import { createSafeActionClient } from "next-safe-action"
import RegisterSchema from '@/types/register-schema'
import * as bcrypt from 'bcrypt'
import { db } from "@/server"
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from '@/server/actions/tokens'
import { sendVerificationEmail } from "./email"

const action = createSafeActionClient()

export const emailRegister = action
	.schema(RegisterSchema)
	.action(async ({ parsedInput: { email, password, name } }) => {
		// hashing password
		const hashPassword = await bcrypt.hash(password, 10)

		// check for existing user
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email)
		})

		if (existingUser) {
			if (!existingUser.emailVerified) {
				const verificationToken = await generateEmailVerificationToken(email)
				await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

				return { success: 'Email verification resent' }
			}
			return { error: 'Email is already in use' }
		}

		await db.insert(users).values({
			email,
			name,
			password: hashPassword
		})

		const verificationToken = await generateEmailVerificationToken(email)

		await sendVerificationEmail( verificationToken[0].email, verificationToken[0].token)

		return { success: 'User created, please verify your email' }
	})


