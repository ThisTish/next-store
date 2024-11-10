import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import BackButton from "./BackButton"
import Socials from "./Socials"

type AuthCardProps = {
	children: React.ReactNode
	cardTitle: string
	backButtonHref: string
	backButtonLabel: string
	showSocials?: boolean
}

const AuthCard = ({
	children,
	cardTitle,
	backButtonHref,
	backButtonLabel,
	showSocials
}: AuthCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{cardTitle}</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{showSocials && (
				<CardFooter >
					<Socials />
				</CardFooter>
			)}
				<CardFooter className="justify-between">
					<BackButton href={backButtonHref} label={backButtonLabel} />
				
				</CardFooter>
		</Card>
	);
}

export default AuthCard;