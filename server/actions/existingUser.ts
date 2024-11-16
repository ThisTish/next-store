import { eq } from "drizzle-orm"
import { db } from ".."
import { users } from "../schema"

export const existingUserByEmail = async (email: string) => {
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email)
	})
	if (!existingUser) {
		return { error: 'User not found' }
	}
	return existingUser
}

