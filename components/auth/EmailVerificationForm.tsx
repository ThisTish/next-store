'use client'

import { newVerification } from "@/server/actions/tokens"
import { useSearchParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import AuthCard from "./AuthCard"
import FormSuccess from "./FormSuccess"
import FormError from "./FormError"

const EmailVerificationForm = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const token = useSearchParams().get('token')
	const router = useRouter()

	const handleVerification = useCallback(() =>{

		if (success || error) return

		if (!token) {
			setError('Token not found')
			return
		}
		newVerification(token).then((data) => {
			if (data.error) setError(data.error)
			if (data.success) {
				setSuccess(data.success)
				router.push('/auth/login')
			}
		})

	}, []) 

	useEffect(() => {
		handleVerification()
	}, [])
	
	return (
	<AuthCard cardTitle="Verify your account" backButtonHref="/auth/login" backButtonLabel="Back to Login">
		<p className="mx-auto">{!success && !error ? 'Verifying email...' : null}</p>
		<FormSuccess message={success} />
		<FormError message={error} />
	</AuthCard>
	)
}

export default EmailVerificationForm