'use server'
import LoginSchema from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"


const actionClient = createSafeActionClient()

export const emailSignin = actionClient
	.schema(LoginSchema)
	.action( async ({parsedInput: {email, password, code}}) =>{
		return console.log(email, password, code)

	})
	

 