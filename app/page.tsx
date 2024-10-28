import { Button } from "@/components/ui/button"

export default async function Home() {


  return (
      <main >
        <Button>default</Button>
        <Button variant={"destructive"}>Destructive</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"link"}>Link</Button>
        <Button variant={"outline"}>outline</Button>
        <Button variant={"secondary"}>secondary</Button>

      </main>


  )
}

