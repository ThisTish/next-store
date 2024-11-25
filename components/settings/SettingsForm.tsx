"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Session } from "next-auth"
import SettingsSchema from "@/types/settings-schema"
import Image from "next/image"
import { Switch } from "../ui/switch"
import FormError from "../auth/FormError"
import FormSuccess from "../auth/FormSuccess"
import { useState } from "react"


type SettingsFormProps = {
	session: Session
}

const SettingsForm = (session: SettingsFormProps) => {
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [avatarUploading, setAvatarUploading] = useState(false)


	const form = useForm<z.infer<typeof SettingsSchema>>({
		defaultValues: {
			name: session.session.user?.name || undefined,
			email: session.session.user?.email || undefined,
			image: session.session.user?.image || undefined,
			// isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
			password: undefined,
			newPassword: undefined

		}
	})

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		console.log(values)
		// execute(values)
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Jane Doe" disabled={status === 'executing'} {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
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
								<Input placeholder="Jane Doe" disabled={status === 'executing'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* image */}
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<div className="flex">
								{!form.getValues('image') ?
									<div className="font-bold bg-primary/50 rounded-full text-5xl flex items-center justify-center size-20 text-secondary text-center">{session.session?.user?.name?.charAt(0).toUpperCase()}</div>
									:
									<Image
										className="rounded-full"
										src={form.getValues('image')!}
										width={40}
										height={40}
										alt={session.session.user?.name ?? 'Profile pic'} />
								}
							</div>
							<FormControl>
								<Input
									placeholder="User Image"
									type="hidden"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* passwords */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="**********" disabled={status === 'executing'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input placeholder="*********" disabled={status === 'executing'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="isTwoFactorEnabled"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Two Factor Authentication</FormLabel>
							<FormDescription>
								Enable two factor authentication
							</FormDescription>
							<FormControl>
								<Switch 
								disabled={status === 'executing'}
								checked={form.getValues('isTwoFactorEnabled') || false}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
					<FormError />
					<FormSuccess />
				<Button disabled={status === 'executing' || avatarUploading} type="submit">Update your settings </Button>
			</form>
		</Form>
	)
}

export default SettingsForm