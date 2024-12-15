"use client"

import { VariantsWithImagesTags } from "@/lib/infer-types"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

type productVariantProps = {
	editMode: boolean
	productId: number
	variant?: VariantsWithImagesTags
	children: React.ReactNode
}

const ProductVariant = ({ editMode, productId, variant, children }: productVariantProps) => {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your account
							and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ProductVariant