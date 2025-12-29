import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { Ticket, TicketFormInputs, ticketSchema } from '@/lib/schemas/ticket.schema';

export const GET = async () => {
    try {
        const tickets = await prisma.ticket.findMany()
        return NextResponse.json({ tickets })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.message
            return NextResponse.json({ error: message }, { status: 400 })
        }

        const message = error instanceof Error ? error.message : "Ocurrió un error al intentar obtener los tickets."
        console.log(message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {

    const newUserId = uuidv4(); // Genera el UUID en JS

    try {

        const body = await request.json()

        body.id = newUserId

        const { title, description, assignedTo, status } = ticketSchema.parse(body)

        const ticket = await prisma.ticket.create({
            data: {
                id: newUserId,
                title,
                assignedTo,
                description,
                status,
                updatedAt: new Date()
            }
        })
        return NextResponse.json({ message: "Ticket creado exitosamente", ticketId: ticket.id }, { status: 201 })

    } catch (error) {

        if (error instanceof z.ZodError) {
            const message = error.issues
            return NextResponse.json({ error: message }, { status: 400 })
        }

        const message = error instanceof Error ? error.message : "Ocurrió un error al intentar crear el ticket."
        console.log(message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}