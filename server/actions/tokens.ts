'use server'

import { eq } from "drizzle-orm"
import { db } from ".."
import { emailTokens, users } from "../schema"

export const getVerificationTokenByEmail = async (email: string) =>{
	try{
		const verificationToken = await db.query.emailTokens.findFirst({
			where: eq(emailTokens.token, email)
		})
		return verificationToken
	}catch(error){
		return null
	}
}

export const generateEmailVerificationToken = async (email: string) =>{
	const token = crypto.randomUUID()
	const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)

	const existingToken = await getVerificationTokenByEmail(email)

	if(existingToken){
		await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
	}

	const verificationToken = await db.insert(emailTokens).values({
	email,
	token,
	expires
	}).returning()
	return verificationToken
}

export const getVerificationTokenByToken = async (token: string)=>{
    try{
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.token, token),
        })
        return verificationToken
    }catch(error){
        return null
    }
}


export const newVerification = async (token: string ) =>{
	const existingToken = await getVerificationTokenByToken(token)
	if(!existingToken) return { error: "Token not found"}
	
	const hasExpired = new Date(existingToken.expires) < new Date()
	if(hasExpired) return { error: 'Token has expired'}

	const existingUser = await db.query.users.findFirst({where: eq(users.email, existingToken.email)})
	if(!existingUser) return { error: 'User not found'}
	
	await db.update(users).set({
		emailVerified: new Date()
	}).where(eq(users.email, existingToken.email))

	await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
	return { success: 'Email verified'}
}