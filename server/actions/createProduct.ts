"use server"

import { ProductSchema } from "@/types/product-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from ".."
import { products } from "../schema"
import { eq } from "drizzle-orm"


const action = createSafeActionClient()

export const createProduct = action
	.schema(ProductSchema)
	.action(async ({ parsedInput: { title, description, price, id } }) => {
		try {
			if (id) {
				const currentProduct = await db.query.products.findFirst({
					where: eq(products.id, id)
				})
				if (!currentProduct) {
					return { error: "product not found" }
				}
				const editedProduct = await db
					.update(products)
					.set({ description, price, title })
					.where(eq(products.id, id))
					.returning()
				return { success: `Product ${editedProduct[0].title} has been updated` }
			}

			if (!id) {
				const newProduct = await db
					.insert(products)
					.values({ title, description, price, created: new Date() })
					.returning()

				return { success: `Product ${newProduct[0].title} has been created` }
			}

		} catch (error) {
			return { error: `Error adding product ${error}` }
		}

	}
	)