'use client'

import { Button } from "../ui/button"
import Link from 'next/link'

const BackButton = ({href, label}: {href:string, label: string}) => {
	return (
		<>
			<Button variant={'ghost'}>
				<Link aria-label={label} href={href}>
					{label}
				</Link>
			</Button>
		</>
	)
}

export default BackButton;