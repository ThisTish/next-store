'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import LoginSchema from '@/types/login-schema'
import * as z from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { emailSignin } from "@/server/actions/emailSignin"
import { useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"
import { useRouter } from "next/navigation"


const LoginForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	
	const router = useRouter()
	
	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { execute, status, } = useAction(emailSignin, {
		onSuccess(data) {
			if(data.data?.error){
				setError(data.data.error)
			}
			if(data.data?.success){
				setSuccess(data.data.success)
			}
		}
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		execute(values)
		router.push('/')
	}

	return (
		<>
			<AuthCard cardTitle="Welcome Back" backButtonHref="/auth/register" backButtonLabel="Create New Account" showSocials>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>

							{/* email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="you@gmail.com" type="email" autoComplete="email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* password */}
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input {...field} placeholder="********" type="password" autoComplete="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								className={cn('mx-auto my-3 w-full',
									status === 'executing' ? 'animate-pulse' : '')}
								type="submit"
							>
								Login
							</Button>

							<FormSuccess message={success} />
							<FormError message={error} />

							<Button variant={'link'} >
								<Link href="/auth/forgot-password">Forgot password?</Link>
							</Button>
							<hr className="mt-3" />

						</form>

					</Form>
				</div>
			</AuthCard>
		</>

	)
}

export default LoginForm