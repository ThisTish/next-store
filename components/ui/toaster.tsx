"use client"

import { Toaster as Toasty } from 'sonner'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Toaster = () =>{
	const {theme } = useTheme()

	const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
setIsMounted(true)
}, [])

if (!isMounted) {
return null
}

	if(typeof theme === "string"){
		return (
			<Toasty 
			richColors
			theme={theme as 'light' | 'dark' | 'system' | undefined}
			/>
		)
	}
}

export default Toaster