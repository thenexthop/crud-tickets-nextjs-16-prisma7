import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction
} from "@/components/ui/card";
import { Ticket } from "@/lib/schemas/ticket.schema";
import { Trash2Icon } from "lucide-react";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
    return (
        <>
            <Card className="max-w-md w-full p-4">
                <CardHeader className="flex items-center justify-between p-2">
                    <div>
                        <CardTitle className="text-lg font-semibold mb-1">{ticket.title}</CardTitle>
                        <CardDescription>{ticket.description || "N/A"}</CardDescription>
                    </div>

                    <CardAction>
                        <Button variant="danger">
                            <Trash2Icon className="w-4 h-4" />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p>{ticket.status}</p>
                </CardContent>
                <CardFooter>
                    <p className="font-medium text-neutral-700">Asignado a: {ticket.assignedTo}</p>
                </CardFooter>
            </Card>
        </>
    )
}