import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import LoginSchema from "@/types/login-schema"
import { eq } from "drizzle-orm"
import { users } from "@/server/schema"
import { compare } from "bcrypt"


export const { handlers, auth, signIn, signOut } = NextAuth({
	
	adapter: DrizzleAdapter(db),
	secret: process.env.AUTH_SECRET,
	session:{
		strategy: 'jwt'
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true
			
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true

		}),
		Credentials({
			type: 'credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			authorize: async (credentials) =>{
				const validatedFields = LoginSchema.safeParse(credentials)

				if(validatedFields.success){
					const user = await db.query.users.findFirst({
						where: eq(users.email, validatedFields.data.email)
					})
					if(!user || !user.password) return null

					const passwordMatch = await compare(validatedFields.data.password, user.password)
					if(passwordMatch) return user
				}
				return null
			}
		})	
	]
})