"use client"

import { useForm } from "react-hook-form"
import { zProductSchema, ProductSchema } from "@/types/product-schema"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Card,
	CardContent,
	CardDescription,
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

const ProductForm = () => {

	const createProductForm = useForm<zProductSchema>({
		resolver: zodResolver(ProductSchema),
			defaultValues: {
				title: '',
				description: '',
				price: 0
			}
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...createProductForm}>
					<form onSubmit={createProductForm.handleSubmit(()=> console.log('hey'))} className="space-y-8">

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
									<FormLabel>Product Description"</FormLabel>
									<FormControl>
										<Input placeholder="Description of product" {...field} />
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
											className="bg-muted rounded-md p-2"/>
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
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
		</Card>


	);
}

export default ProductForm;