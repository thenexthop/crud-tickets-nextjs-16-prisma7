import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import TicketCard from "./_components/ticket-card";
import { getTickets } from "./_actions/tickets.actions";
import Link from "next/link";

export default async function TicketsPage() {
    const { tickets } = await getTickets()

    return (
        <div className="max-w-5xl mx-auto p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Tickets</h1>
                <Button variant="default" asChild>
                    <Link href="/tickets/new">
                        <CirclePlusIcon className="w-4 h-4" />
                        Agregar Ticket
                    </Link>
                </Button>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    )
}