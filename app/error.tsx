'use client'

import { useEffect } from "react"
const Error = ({ error, reset }: {
	error: Error & { digest?: string }
	reset: () => void
}) => {
	useEffect(() => {
		console.error(error)
	}, [error])


	return (
		<div className="w-full min-h-full text-lg flex items-center justify-center flex-col">
			<h2>{error.message}</h2>
			<button onClick={() => reset()}>
				Try Again
			</button>
		</div>
	)
}

export default Error;