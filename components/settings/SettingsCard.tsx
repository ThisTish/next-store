"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Session } from "next-auth"
import SettingsForm from "./SettingsForm"

type SettingsFormProps = {
	session: Session
  }

const SettingsCard = ({ session }: SettingsFormProps) => {

	return (
		<Card>
			<CardHeader>
				<CardTitle>User Settings</CardTitle>
				<CardDescription>Update your account settings</CardDescription>
			</CardHeader>
			<CardContent>
				<SettingsForm session={session} />


			</CardContent>
		</Card>


	)
}

export default SettingsCard