"use server"
import ResetPasswordSchema from "@/types/reset-password-schema"
import { createSafeActionClient } from "next-safe-action"

import { existingUserByEmail } from "./existingUser"
import { generatePasswordResetToken } from "./tokens"
import { sendPasswordResetTokenEmail } from "./email"

const action = createSafeActionClient()


export const resetPassword = action
	.schema(ResetPasswordSchema)
	.action(async ({ parsedInput: { email } }) =>{
		const existingUser = await existingUserByEmail(email)

		const passwordResetToken = await generatePasswordResetToken(email)
		if(!passwordResetToken) return { error: 'Token not generated' }

		await sendPasswordResetTokenEmail(passwordResetToken[0].email, passwordResetToken[0].token)

		return { success: 'Password reset email sent'}
	} )
