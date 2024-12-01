"use server"

import { eq } from "drizzle-orm"
import { db } from ".."
import { products } from "../schema"

const getProduct = async (id:number) =>{
	try {
		const product = await db.query.products.findFirst({
			where: eq(products.id, id)
		})
		if(!product) throw new Error('Product not found')
		return {success: product}
	} catch (error) {
		return {error: 'Product not found'}
	}
}

export default getProduct