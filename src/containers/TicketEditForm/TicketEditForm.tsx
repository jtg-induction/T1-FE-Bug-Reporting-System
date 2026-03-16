import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { TICKET_SEVERITY_OPTIONS, TICKET_STATUS_OPTIONS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketFormValues, ticketSchema } from '@schemas';

import { TicketFormContainerProps } from './TicketEditForm.types';

export const TicketEditForm = ({ 
    open, 
    onClose, 
    ticket, 
    memberOptions, 
    onUpdate, 
    isLoading, 
    isStatusOnly = false 
}: TicketFormContainerProps) => {
    const formId = 'ticket-edit-form';
    
    const { control, handleSubmit, reset } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            severity: ticket.severity,
            assignee: ticket.assignee || '', 
            deadline: ticket.deadline || null,
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                title: ticket.title,
                description: ticket.description,
                status: ticket.status,
                severity: ticket.severity,
                assignee: ticket.assignee || '',
                deadline: ticket.deadline || null,
            });
        }
    }, [open, ticket, reset]);

    const onSubmit = async (data: TicketFormValues) => {
        await onUpdate(data);
        onClose();
    };

    return (
        <ModalForm 
            open={open} 
            title={isStatusOnly ? "Update Status" : "Edit Ticket"} 
            formId={formId} 
            onClose={onClose} 
            isLoading={isLoading}
        >
            <form id={formId} onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
                <Stack spacing={3} pt={1}>
                    {isStatusOnly ? (
                        /* Level 2 Permission: Status Only */
                        <FormField 
                            name="status" 
                            control={control} 
                            label="Status" 
                            editStatus={true} 
                            type="select" 
                            options={TICKET_STATUS_OPTIONS.filter(o => o.VALUE !== 4)} 
                        />
                    ) : (
                        <>
                            <FormField name="title" control={control} label="Title" editStatus={true} />
                            <FormField name="description" control={control} label="Description" editStatus={true} multiline rows={4} />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <FormField name="status" control={control} label="Status" editStatus={true} type="select" options={TICKET_STATUS_OPTIONS.filter(o => o.VALUE !== 4)} />
                                <FormField name="severity" control={control} label="Severity" editStatus={true} type="select" options={TICKET_SEVERITY_OPTIONS} />
                            </Stack>
                            <FormField name="assignee" control={control} label="Assignee" editStatus={true} type="select" options={memberOptions} />
                            <FormField name="deadline" control={control} label="Deadline" editStatus={true} type="date" />
                        </>
                    )}
                </Stack>
            </form>
        </ModalForm>
    );
};