import * as z from 'zod'

const NewPasswordSchema = z.object({
	
	newPassword: z.string().min(8,{
		message:'Password must be at least 8 characters long'
	}),
	token: z.string().nullable().optional()
})

export default NewPasswordSchema