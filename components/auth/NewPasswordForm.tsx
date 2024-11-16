import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

'use client'
import AuthCard from "./AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"
import NewPasswordSchema from "@/types/new-password-schema"
import { newPassword } from '@/server/actions/newPassword'

const NewPasswordForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
		
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			newPassword: '',
			token: ''
		}
	})

	const { execute, status, } = useAction(newPassword, {
		onSuccess(data) {
			if(data.data?.error){
				setError(data.data.error)
			}
			if(data.data?.success){
				setSuccess(data.data.success)
			}
		}
	})

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		execute(values)
	}

	return (
		<>
			<AuthCard cardTitle="Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to Login" showSocials>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>

							{/* token */}
							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter your token" type="text" value={field.value ?? ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* new password */}
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input {...field} placeholder="********" type="password" />
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
								Set New Password
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

export default NewPasswordForm