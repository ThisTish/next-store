"use client"


import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"



interface DashboardNavProps {
	allLinks: {
		label: string,
		path: string,
		icon: JSX.Element
	}[],
}


const DashboardNav = ({ allLinks }: DashboardNavProps) => {
	const pathName = usePathname()


	return (

		<nav className="py-2 overflow-hidden mb-4">
			<ul className=" flex gap-6 text-sm font-semibold">
				<AnimatePresence>
				{allLinks.map((link, index) => (
					<motion.li
						whileTap={{ scale: 0.9 }}
						key={index}>
						<Link
							href={link.path}
							className={cn('flex gap-1 flex-col items-center relative',
								pathName === link.path && 'text-primary'
							)}>
							{link.icon}
							{link.label}
							{pathName === link.path ? (

								<motion.div
									initial={{ scale: 0.5 }}
									animate={{ scale: 1 }}
									layoutId="underline"
									transition={{ type: 'spring', stiffness: 35}}
									className="h-[3px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-2"
								/>
							) : null}

						</Link>
					</motion.li>
				))}
				</AnimatePresence>
			</ul>
		</nav>
	);
}

export default DashboardNav