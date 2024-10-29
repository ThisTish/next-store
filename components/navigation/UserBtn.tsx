'use client'

import {signOut} from 'next-auth/react'
import { Session } from "next-auth"

const UserBtn = ({user}: Session) => {
	return (
		<>
			<h1>{user?.email}</h1>
			<button onClick={() => signOut()}>SignOut</button>
		</>
	)
}

export default UserBtn