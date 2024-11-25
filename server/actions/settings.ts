"use server"

import SettingsSchema from "@/types/settings-schema"
import { createSafeActionClient } from "next-safe-action"
import { auth } from "../auth"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { compare, hash } from "bcrypt"
import { revalidatePath } from "next/cache"

const action = createSafeActionClient()

const settings = action
.schema(SettingsSchema)
.action(async ({ parsedInput: values }) => {
	const user = await auth()
	if(!user) return { error: 'User not found'}

	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, user.user.id)
	})
	if(!dbUser) return { error: 'User not found'}

	if(user.user.isOAuth){
		values.email = undefined
		values.password= undefined
		values.newPassword = undefined
		values.isTwoFactorEnabled = undefined
	}

	if(values.password && values.newPassword && dbUser.password){
		const passwordMatch = await compare(values.password, dbUser.password)
		if(!passwordMatch) return { error: 'Incorrect password'}

		const samePassword = await compare(values.newPassword, dbUser.password)
		if(samePassword) return { error: 'New password must be different from old password'}
		
		const hashedPassword = await hash(values.newPassword, 10)
		values.password = hashedPassword
		values.newPassword = undefined

	}
	const updatedUser = await db.update(users).set({
		name: values.name,
		password: values.password,
		email: values.email,
		image: values.image,
		twoFactorEnabled: values.isTwoFactorEnabled
	}).where(eq(users.id, dbUser.id))
	revalidatePath('/dashboard/settings')
	return { success: 'Settings updated'}
})

export default settings