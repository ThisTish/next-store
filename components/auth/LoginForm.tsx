'use client'

import AuthCard from "./AuthCard";


const LoginForm = () => {
	return (
		<>
		<AuthCard cardTitle="Welcome Back" backButtonHref="/auth/register" backButtonLabel="Create New Account" showSocials>
			<h1>AuthCard</h1>
		</AuthCard>
		</>

	);
}

export default LoginForm