import { z } from 'zod';

export const ticketSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters'),
    status: z.number(),
    severity: z.number(),
    assignee: z.string().optional().or(z.literal('')),
    deadline: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === '' ? null : val)),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

export const INITIAL_TICKET_DATA: TicketFormValues = {
    title: '',
    description: '',
    status: 1,
    severity: 1,
    assignee: '',
    deadline: null,
};
