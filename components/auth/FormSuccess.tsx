import { CheckCircle } from "lucide-react"

const FormSuccess = ({message}: {message?: string}) => {
	if(!message) return null

	return ( 
		<div className=" flex items-center gap-2 my-4 bg-teal-400/25 text-xs justify-center text-secondary-foreground p-3">
			<CheckCircle className="size-4" />
			<p>{message}</p>
		</div>

	 )
}
 
export default FormSuccess