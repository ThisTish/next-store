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
import NewPasswordSchema from "@/types/new-password-schema"
import { newPassword } from '@/server/actions/newPassword'
import { useSearchParams } from "next/navigation"

const NewPasswordForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const searchParams = useSearchParams()
	const token = searchParams.get('token')
		
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			newPassword: ''
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
		execute({newPassword: values.newPassword, token})
	}

	return (
		<>
			<AuthCard cardTitle="Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to Login" showSocials>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>

							{/* new password */}
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input {...field} placeholder="********" type="password" disabled={status === 'executing'}/>
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