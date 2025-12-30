import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import TicketCard from "@/features/tickets/components/ticket-card"
import { getTickets } from "./_actions/tickets.actions";
import TicketsPagination from "@/features/tickets/components/tickets-pagination";

interface TicketsPageProps {
    searchParams?: Promise<{ page: string, limit: string }>
}

const DEFAULT_LIMIT = 4

export default async function TicketsPage({
    searchParams
}: TicketsPageProps) {

    const page = Number((await searchParams)?.page || 1)
    const limit = Number((await searchParams)?.limit || DEFAULT_LIMIT)

    const { tickets, totalPages } = await getTickets({ page, limit })

    return (
        <div className="max-w-5xl mx-auto p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Tickets</h1>
                <Button variant="default" asChild>
                    <Link href="/tickets/new">
                        <CirclePlusIcon className="w-4 h-4" />
                        Nuevo ticket
                    </Link>
                </Button>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
            <div>
                <TicketsPagination
                    currentPage={page}
                    totalPages={totalPages}
                    limit={limit}
                />
            </div>
        </div>
    )
}