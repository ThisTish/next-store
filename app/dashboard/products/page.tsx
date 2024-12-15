import { db } from "@/server"
import placeholder from '@/public/placeholder.jpg'
import { DataTable } from "./data-table"
import { columns } from "./columns"

const ProductsPage = async() => {

	const products = await db.query.products.findMany({
		orderBy: (products, {desc}) => [desc(products.id)]
	})

	// throw new error casts to error page
	if(!products) throw new Error('No products found')

	const dataTable = products.map((product) =>{
		return {
			id: product.id,
			title: product.title,
			price: product.price,
			variants: [],
			image: placeholder.src
		}
	})
	if(!dataTable) throw new Error('Data not found')

	return (
		<div>
			<DataTable columns={columns} data={dataTable} />
		</div>
	)
}

export default ProductsPage