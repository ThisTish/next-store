import { z } from "zod";

const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: "email is required"
	})
})

export default ResetPasswordSchema