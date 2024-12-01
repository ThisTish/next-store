import ProductForm from "@/components/dashboard/ProductForm"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"

const AddProductPage = async () => {

	const session = await auth()
	if(session?.user.role !== 'admin') return redirect('/dashboard/settings')

	

	return (
		<div>
			<ProductForm />
		</div>
	)
}

export default AddProductPage