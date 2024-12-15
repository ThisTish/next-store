"use client"

import { useForm } from "react-hook-form"
import { zProductSchema, ProductSchema } from "@/types/product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DollarSign } from "lucide-react"
import Tiptap from "./TipTap"
import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/server/actions/createProduct"
import { useRouter, useSearchParams } from "next/navigation"
import getProduct from "@/server/actions/get-product"
import { useEffect } from "react"

const ProductForm = () => {

	const createProductForm = useForm<zProductSchema>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0
		},
		mode: 'onChange'
	})

	const router = useRouter()

	const searchParams = useSearchParams()
	const editMode = searchParams.get('id')

	const checkProduct = async (id: number) =>{
		if(editMode){
			const data = await getProduct(id)
			if(data.error){
				toast.error(data.error)
				router.push('/dashboard/products')
				return
			}
			if(data.success){
				const id = parseInt(editMode)
				createProductForm.setValue("title", data.success.title)
				createProductForm.setValue("description", data.success.description)
				createProductForm.setValue("price", data.success.price)
				createProductForm.setValue("id", id)
			}
		}
	}

	useEffect(() =>{
		if(editMode){
			checkProduct(parseInt(editMode))
		}
	}, [])

	const { execute, status } = useAction(createProduct, {
		onSuccess: (data) => {

			if (data.data?.success) {
				router.push('/dashboard/products')
				toast.success(data.data.success)

			}
			if (data.data?.error) {
				console.log(data.data.error)
				toast.error(data.data.error)
			}
		},

		onExecute: (data) => {
			if(editMode){
				toast.loading('Updating Product')
			}
			if(!editMode){
			toast.loading('Creating Product')
			}
		},
		onError: (error) => {
			console.log(error)
		}
	})


	const onSubmit = (values: zProductSchema) => {
		execute(values)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{editMode ? "Edit Product" : "Create Product"}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...createProductForm}>
					<form onSubmit={createProductForm.handleSubmit(onSubmit)} className="space-y-8">

						{/* title */}
						<FormField
							control={createProductForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Title</FormLabel>
									<FormControl>
										<Input placeholder="Saekdong Stripe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* description */}
						<FormField
							control={createProductForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Description</FormLabel>
									<FormControl>
										<Tiptap val={field.value} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* price */}
						<FormField
							control={createProductForm.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Price"</FormLabel>
									<FormControl>
										<div className="flex items-center gap-2">
											<DollarSign
												size={32}
												className="bg-muted rounded-md p-2" />
											<Input
												type="number"
												placeholder="10"
												step={0.1}
												min={0}
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={status === 'executing' || !createProductForm.formState.isValid || !createProductForm.formState.isDirty}
						>{editMode ? "Save Changes" : "Create Product"}</Button>
					</form>
				</Form>
			</CardContent>
		</Card>


	);
}

export default ProductForm;