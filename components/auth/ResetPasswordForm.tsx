"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"
import ResetPasswordSchema from "@/types/reset-password-schema"
import { resetPassword } from "@/server/actions/resetPassword"


const ResetPasswordForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: '',
		}
	})

	const { execute, status, } = useAction(resetPassword, {
		onSuccess(data) {
			if (data.data?.error) {
				setError(data.data.error)
			}
			if (data.data?.success) {
				setSuccess(data.data.success)
			}
		}
	})

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		execute(values)
	}

	return (
		<>
			<AuthCard cardTitle="Forgot your login password?" backButtonHref="/auth/login" backButtonLabel="Back to Login" showSocials>
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
											<Input {...field} placeholder="Enter your email" type="text" value={field.value ?? ''} autoComplete="email" disabled={status === 'executing'} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* new password */}

							<Button
								className={cn('mx-auto my-3 w-full',
									status === 'executing' ? 'animate-pulse' : '')}
								type="submit"
							>
								Reset Password
							</Button>

							<FormSuccess message={success} />
							<FormError message={error} />

						</form>

					</Form>
				</div>
			</AuthCard>
		</>

	)
}

export default ResetPasswordForm