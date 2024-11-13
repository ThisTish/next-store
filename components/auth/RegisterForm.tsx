'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import RegisterSchema from '@/types/register-schema'
import * as z from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import { emailRegister } from "@/server/actions/emailRegister"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"



const RegisterForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const {execute, status} = useAction(emailRegister, {
		onSuccess: (data)=>{
			if(data.data?.error) setError(data.data?.error)
			if(data.data?.success) setSuccess(data.data?.success)

		}
	})

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		execute(values)
		form.reset()
	}

	return (
		<>
			<AuthCard cardTitle="Create A New Account" backButtonHref="/auth/login" backButtonLabel="Already have an account?" >
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							
							{/* name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field}  placeholder="Suzie" type="name" autoComplete="name"/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field}  placeholder="you@gmail.com" type="email" autoComplete="email"/>
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
											<Input {...field}  placeholder="********" type="password" autoComplete="password"/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

								<FormSuccess message={success}/>
								<FormError message={error} />

								<Button 
									className={cn('mx-auto my-3 w-full', 
										status === 'executing' ? 'animate-pulse' : '')} 
									type="submit" 
								>
									Save</Button>
								<hr className="mt-3"/>
							
						</form>

					</Form>
				</div>
			</AuthCard>
		</>

	)
}

export default RegisterForm