import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

export default function NewTicketPage() {
    return (
        <div className="max-w-5xl mx-auto p-8 space-y-6">
            <Link href="/tickets" className="flex items-center gap-2">
                <ChevronLeftIcon className="w-4 h-4" />
                <span className="text-md text-gray-800 hover:underline hover:text-gray-900">Regresar</span>
            </Link>
            <h1 className="text-3xl font-bold">Crear un nuevo ticket</h1>
        </div>
    )
}