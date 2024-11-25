"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import LoginSchema from '@/types/login-schema'
import { useState } from "react"
import { useRouter } from "next/navigation"

import * as z from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"

import { emailSignin } from "@/server/actions/emailSignin"
import { useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import Link from "next/link"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"


const LoginForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [showTwoFactor, setShowTwoFactor] = useState(false)

	const router = useRouter()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: ''
		}
	})

	const { execute, status, } = useAction(emailSignin, {
		onSuccess(data) {
			if (data.data?.error) {
				setError(data.data.error)
			}
			if (data.data?.success) {
				setSuccess(data.data.success)
				router.push('/dashboard')
				router.refresh()
			}
			if (data.data?.twoFactor) {
				setShowTwoFactor(true)
			}
		}
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		execute(values)
	}

	return (
		<>
			<AuthCard cardTitle="Welcome Back" backButtonHref="/auth/register" backButtonLabel="Create New Account" showSocials>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>

							{showTwoFactor ? (
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{""} We've sent a two factor code to your email</FormLabel>
											<FormControl>
												<InputOTP disabled={status === 'executing'} {...field} maxLength={6} >
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : (
								<>
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
								</>
							)}

							<Button
								className={cn('mx-auto my-3 w-full',
									status === 'executing' ? 'animate-pulse' : '')}
								type="submit"
							>
								{showTwoFactor ? 'Verify' : 'Login'}
							</Button>

							<FormSuccess message={success} />
							<FormError message={error} />

							<Button variant={'link'} className="px-0" >
								<Link href="/auth/reset-password">Forgot password?</Link>
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