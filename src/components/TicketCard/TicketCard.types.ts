import { TicketCreateResponse } from "types/common";

export type TicketStatus = 'TODO' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface Ticket {
    id: string;
    title: string;
    projectName: string;
    deadline: string;
    status: TicketStatus;
    ticketKey: string;
}

export interface TicketCardProps {
    ticket: TicketCreateResponse;
    onClick: (projectId:string, ticketId: string) => void;
    hideDeadline?: boolean;
}
