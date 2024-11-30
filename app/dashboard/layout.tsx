import DashboardNav from "@/components/navigation/DashboardNav"
import { auth } from "@/server/auth"
import { Package, PenSquare, Settings, Truck } from "lucide-react"



export default async function RootLayout({
	children }: Readonly<{
		children: React.ReactNode
	}>) {

	const session = await auth()


	const userLinks = [
		{
			label: 'Orders',
			path: '/dashboard/orders',
			icon: <Truck />
		},
		{
			label: 'Settings',
			path: '/dashboard/settings',
			icon: <Settings />
		}
	]
	
	const adminLinks = session?.user.role === 'admin' ? [
		{
			label: 'Analytics',
			path: '/dashboard/analytics',
			icon: <Settings />
		},
		{
			label: 'Create',
			path: '/dashboard/add-product',
			icon: <PenSquare />
		},
		{
			label: 'Products',
			path: '/dashboard/products',
			icon: <Package />
		},
	] : []
	
	const allLinks = [ ...adminLinks, ...userLinks]
	
	


	return (
		<div>		
			<DashboardNav allLinks={allLinks} />
			{children}
		</div>
	)
}