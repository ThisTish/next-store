import { auth } from "@/server/auth"
import Logo from "./Logo"
import UserBtn from "./UserBtn"
import { Button } from "../ui/button"
import Link from "next/link"
import { LogIn } from 'lucide-react'

const Nav = async () => {
	const session = await auth()
	return (
		<header className="bg-slate-400 py-4">
			<ul className="flex justify-between">
				<li>
					<Link href='/'>
					<Logo />
					</Link>
				</li>
				{!session ? (
					<li>
						<Button asChild>
							<Link href='/auth/login'>
								<LogIn />
								<span>Login</span>
							</Link>
						</Button>
					</li>
				)
					:
					(
						<li>
							<UserBtn expires={session?.expires ?? ''} user={session?.user} />
						</li>
					)
				}
			</ul>
		</header>
	)
}

export default Nav