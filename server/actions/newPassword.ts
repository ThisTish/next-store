"use server"

import NewPasswordSchema from "@/types/new-password-schema"
import { createSafeActionClient } from "next-safe-action"
import { getPasswordResetToken } from "./tokens"
import { db } from ".."
import { passwordResetTokens, users } from "../schema"
import { eq } from "drizzle-orm"
import { hash } from "bcrypt"

const action = createSafeActionClient()

export const newPassword = action
	.schema(NewPasswordSchema)
	.action(async ({ parsedInput : { newPassword, token } }) => {

		if (!token) return { error: "Token not found" }

		const existingToken = await getPasswordResetToken(token)
		if(!existingToken) return { error: 'Token not found'}

		if ('expires' in existingToken) {
			const hasExpired = new Date(existingToken.expires ?? 0) < new Date()
			if(hasExpired) return { error: 'Token has expired'}
		}

		if('email' in existingToken && existingToken.email){
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, existingToken.email)
			})	

			if(!existingUser) return { error: 'User not found'}

			const hashedPassword = await hash(newPassword, 10)

			await db.transaction(async (tx) =>{
				tx.update(users)
					.set({ password: hashedPassword })
					.where(eq(users.id, existingUser.id))

			await tx.delete(passwordResetTokens)
			await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id))
		})
		return { success: 'Password updated'}
	}
	})
	

