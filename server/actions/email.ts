'use server'

import getBaseUrl from "@/lib/baseUrl"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = getBaseUrl()

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification-token?token=${token}`
	const { data, error } = await resend.emails.send({
		from: "onboard@resend.dev",
		to: 'tish.sirface@gmail.com',
		subject: "Sprout and Scribble - Confirmation Email",
		html: `<p>Click to <a href='${confirmLink}'>confirm your email</a></p>`,
	})
	if (error) return console.log(error)
	if (data) return data
}