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
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import variantSchema from "@/types/variant-schema"

type productVariantProps = {
	editMode: boolean
	productId: number
	variant?: VariantsWithImagesTags
	children: React.ReactNode
}

const ProductVariant = ({ editMode, productId, variant, children }: productVariantProps) => {

	const productVariantForm = useForm<z.infer<typeof variantSchema>>({
		resolver: zodResolver(variantSchema),
		defaultValues: {
			tags: [],
			variantImages: [],
			color: '#000',
			editMode,
			id: undefined,
			productId,
			productType: 'Black Notebook'
		}
	})

	function onSubmit(values: z.infer<typeof variantSchema>) {
		console.log(values)
	}



	return (
		<div>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{editMode ? 'Edit' : 'Create'} your variant</DialogTitle>
						<DialogDescription>
							Manage your product variants with images, tags and more.
						</DialogDescription>
					</DialogHeader>
					<Form {...productVariantForm}>
						<form onSubmit={productVariantForm.handleSubmit(onSubmit)} className="space-y-8">
							{/* product type */}
							<FormField
								control={productVariantForm.control}
								name="productType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product type</FormLabel>
										<FormControl>
											<Input placeholder="variants title" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* color */}
							<FormField
								control={productVariantForm.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Color</FormLabel>
										<FormControl>
											<Input type="color" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* tags */}
							<FormField
								control={productVariantForm.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Variant Tags</FormLabel>
										<FormControl>
											{/* <InputTags /> */}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* images */}
							<FormField
								control={productVariantForm.control}
								name="variantImages"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Variant Images</FormLabel>
										<FormControl>
											{/* <ImageInput /> */}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* delete */}
							{editMode && variant ? (
								<Button type="button">
									Delete Variant
								</Button>
							): null}
							{/* submit */}
							<Button type="submit">{editMode ? 'Update variant' : 'Create variant'}</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ProductVariant