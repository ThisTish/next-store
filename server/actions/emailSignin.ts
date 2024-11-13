'use server'
import LoginSchema from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"


const actionClient = createSafeActionClient()

export const emailSignin = actionClient
	.schema(LoginSchema)
	.action( async ({parsedInput: {email, password, code}}) =>{
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
			// send email verification code
			return {error: "Email is not verified"}
		}
		

		console.log(email, password, code)
		return {success: 'Login Successful', email}

	})
	

 