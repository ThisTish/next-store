"use client"

import Image from 'next/image'
import Link from 'next/link'
import { VariantsWithImagesTags } from '@/lib/infer-types'
import { useAction } from 'next-safe-action/hooks'
import { deleteProduct } from '@/server/actions/deleteProduct'

import { ColumnDef, Row } from "@tanstack/react-table"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon, PlusCircle } from 'lucide-react'

import { toast } from 'sonner'
import ProductVariant from './productVariant'


export type Product = {
	id: number
	title: string
	price: number
	variants: VariantsWithImagesTags[]
	image: string
}




const ActionCell = ({ row }: { row: Row<Product> }) => {
	const { execute, status } = useAction(deleteProduct, {
		onSuccess: (data) => {
			if (data?.data?.success) {
				toast.success(data.data.success)
			}
			if (data?.data?.error) {
				toast.error(data.data.error)
			}
		},
		onExecute: (data) => {
			toast.loading('Deleting product')
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const product = row.original
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} className='p-2'><MoreHorizontalIcon /></Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className='cursor-pointer'>
					<Link href={`/dashboard/add-product?id=${product.id}`}>
						Edit Product
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => execute({ id: product }.id)}
					className='dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer'>
					Delete Product
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: 'variants',
		header: 'Variants',
		cell: ({ row }) => {
			const variants = row.getValue('variants') as VariantsWithImagesTags[]
			return (
				<div>
					{variants.map((variant) => (
						<div key={variant.id}>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<ProductVariant productId={variant.productId} variant={variant} editMode={true}>
											<div className="w-5 h-5 rounded-full" key={variant.id} style={{ background: variant.color }}></div>
										</ProductVariant>
									</TooltipTrigger>
									<TooltipContent>
										<p>{variant.productType}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					))}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span>
								<ProductVariant editMode={false} productId={row.original.id}>
									<PlusCircle className='text-primary' width={16} height={16} />
								</ProductVariant>
							</span>
							</TooltipTrigger>
							<TooltipContent>
								Add a variant
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			)
		}
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('en-US', {
				currency: 'USD',
				style: 'currency'
			}).format(price)
			return (
				<div className="text-xs">
					{formatted}
				</div>
			)
		}
	},
	{
		accessorKey: "variants",
		header: "Variants",
	},
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => {
			const cellImage = row.getValue('image') as string
			const cellTitle = row.getValue('title') as string
			return (
				<div>
					<Image
						src={cellImage}
						alt={cellTitle}
						width={50}
						height={50}
						className='rounded-md' />
				</div>
			)
		}
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ActionCell,
	}
]
