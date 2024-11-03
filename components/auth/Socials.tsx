'use client'

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const Socials = () => {
	return (
		<>
			<Button onClick={() => signIn('google',{
				redirect: false,
				callbackUrl: '/'
			})} > Sign in with Google</Button>
			<Button onClick={() => signIn('github',{
				redirect: false,
				callbackUrl: '/'
			})} > Sign in with GitHub</Button>
		</>
	)
}

export default Socials