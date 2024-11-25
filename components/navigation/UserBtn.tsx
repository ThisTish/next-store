'use client'

import { signOut } from 'next-auth/react'
import { Session } from "next-auth"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { LogOut, Moon, Settings, Sun, TruckIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Switch } from '../ui/switch'
import { useRouter } from 'next/navigation'



const UserBtn = ({ user }: Session) => {
	const { setTheme, theme, systemTheme } = useTheme()
	const [checked, setChecked] = useState(false)

	const router = useRouter()

	const setSwitchState = () => {
		switch (theme) {
			case 'dark':
				setTheme('dark')
				return setChecked(true)
			case 'light':
				setTheme('light')
				return setChecked(false)

		}
	}


	if (user)
		return (
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger>
					<Avatar>
						{user.image ? (
							<Image
								src={user.image}
								alt={user.name ?? 'User profile pic'}
								width={40}
								height={40}
								className="rounded-full"
							/>
						) : (
							<AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
						)}
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-64 p-6' align='end'>
					<div className='mb-4 pt-4 flex flex-col gap-1 items-center rounded-lg bg-primary/10 '>
						<Avatar>
							{user.image ? (
								<Image
									src={user.image}
									alt={user.name ?? 'User profile pic'}
									width={40}
									height={40}
									className="rounded-full"
								/>
							) : (
								<AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
							)}
						</Avatar>
						<p className='font-bold text-xs'>{user.name}</p>
						<span className='text-xs font-medium text-secondary'>{user.email}</span>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuItem 
						onClick={() => router.push('/dashboard/orders')}
						className='group cursor-pointer transition-all duration-300 hover:bg-secondary'>
						<TruckIcon className='group-hover:translate-x-1 transition-all duration-300' />
						My Orders
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => router.push('/dashboard/settings')}
						className='group cursor-pointer transition-all duration-300 hover:bg-secondary'>
						<Settings className='group-hover:rotate-180 transition-all duration-500 ease-in-out' />
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer transition-all duration-300 hover:bg-secondary'>
						<div className='group flex items-center'>

							<div className='relative'>
							<Sun className='absolute size-5 group-hover:text-yellow-600 group-hover:rotate-180 dark:scale-0 transition-all duration-300' />
							<Moon className='size-5 group-hover:text-blue-300 dark:scale-100 scale-0 group-hover:rotate-12 transition-all duration-300 ease-in-out' />
							</div>
							<p>Theme <span>{theme}</span> Mode</p>
							<Switch checked={checked} onCheckedChange={(e) => {
								setChecked(prev => !prev)
								if (e) setTheme("dark")
								if (!e) setTheme("light")
							}} />
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem className='group cursor-pointer transition-all duration-300 hover:bg-destructive/20'>
						<LogOut className='group-hover:scale-90 transition-all duration-300' />
						<button onClick={() => signOut()}>
							Logout
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		)
}

export default UserBtn