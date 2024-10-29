import { auth } from "@/server/auth"
import Logo from "./Logo";
import UserBtn from "./UserBtn";

const Nav = async () => {
	const session = await auth()
	return (
		<header className="bg-slate-400 py-4">
			<ul className="flex justify-between">
				<li>
					<Logo />
				</li>
				<li>
					<UserBtn expires={session?.expires ?? ''} user={session?.user}/>
				</li>
			</ul>
		</header>
	);
}

export default Nav