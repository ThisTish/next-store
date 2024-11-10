import { AlertCircle } from "lucide-react"

const FormError = ({ message }: { message?: string }) => {
	if (!message) return null

	return (
		<div className="flex items-center gap-2 text-xs my-4 justify-center bg-destructive/25 text-secondary-foreground p-3">
			<AlertCircle className="size-4" />
			<p>{message}</p>
		</div>

	)
}

export default FormError