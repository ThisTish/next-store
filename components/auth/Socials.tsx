'use client'

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { FaGithubAlt } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const Socials = () => {
	return (
		<div className="flex flex-col items-center w-full gap-4">
			<Button 
				variant={'outline'}
				className="flex gape-4 w-full"				
				onClick={() => signIn('google',{
				redirect: false,
				callbackUrl: '/'
			})} >
				<p> Sign in with Google </p>
				<FcGoogle />
				</Button>
			<Button 
				variant={'secondary'}
				className="flex gape-4 w-full"
				onClick={() => signIn('github',{
				redirect: false,
				callbackUrl: '/'
			})} ><p>Sign in with GitHub</p>
				<FaGithubAlt  />
			</Button>
		</div>
	)
}

export default Socials