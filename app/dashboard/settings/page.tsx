import SettingsCard from "@/components/settings/SettingsCard"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

const SettingsPage = async () => {

	const session = await auth()

	if(!session) redirect('/')
	
	if(session)
	return (
		<div>
			<h1>Settings</h1>
			<SettingsCard session={session} />
		</div>
	)
}

export default SettingsPage