import { boolean } from "drizzle-orm/pg-core"
import { color } from "motion/react"
import { z } from "zod"

const variantSchema = z.object({
	productId: z.number(),
	id: z.number(),
	editMode: z.boolean(),
	productType: z.string().min(3, { message: 'Product type must be at least 3 characters long' }),
	color: z.string().min(3),
	tags: z.array(z.string().min(1, {message: 'Please add at least one tage'})),
	variantImages: z.array(z.object({
		url: z.string().refine((url) => url.search('blob:') !== 0, { message: 'Please wait for image to upload'}),
		size: z.number(),
		key: z.string().optional(),
		id: z.number().optional(),
	})),
})

export default variantSchema