import { Ticket } from "@/lib/schemas/ticket.schema"

export async function getTickets(): Promise<{ tickets: Ticket[] }> {
    const tickets = await fetch("http://localhost:3000/api/tickets")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error al obtener los tickets")
            }
            return res.json() as Promise<{ tickets: Ticket[] }>
        }).catch((error) => {
            console.error("Error al obtener los tickets:", error)
            return { tickets: [] }
        })

    return tickets
}