import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { ModalForm } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_TICKET_DATA, TicketFormValues, ticketSchema } from "@schemas";
import { useGetProjectMembersQuery, useGetTicketQuery } from "@service"; 

import { TicketFormContainerProps } from "./TicketEditForm.types";
import { TicketFields } from "../TicketForm/TicketFields";

export const TicketEditForm = ({ open, onClose, onUpdate, isLoading: isUpdating }: TicketFormContainerProps) => {
    const { pid: projectId, tid: ticketId } = useParams<{ pid: string, tid: string }>();
    const formId = 'update-ticket-form';

    const { data: ticketData, isLoading: isFetching } = useGetTicketQuery(
        { projectId: projectId!, ticketId: ticketId! }, 
        { skip: !projectId || !ticketId }
    );
    const { data: usersResponse } = useGetProjectMembersQuery({ projectId: projectId! }, { skip: !projectId });
    
    const ticket = ticketData?.data;
    const members = usersResponse?.data;

    const userOptions = [
        { VALUE: '', LABEL: 'Unassigned' },
        ...(members?.results?.map(user => ({
            VALUE: user.member.id,
            LABEL: `${user.member.first_name} ${user.member.last_name}`
        })) || [])
    ];

    const { 
        control, 
        handleSubmit, 
        reset, 
        formState: { dirtyFields }
    } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: INITIAL_TICKET_DATA,
    });

    useEffect(() => {
        if (ticket && open) {
            reset(ticket); 
        }
    }, [ticket, reset, open]);

    const handleFormSubmit = async (data: TicketFormValues) => {

        const dirtyPayload = Object.keys(dirtyFields).reduce((acc, key) => {
            const fieldName = key as keyof TicketFormValues;
            acc[fieldName] = data[fieldName];
            return acc;
        }, {} as Partial<TicketFormValues>);

        if (Object.keys(dirtyPayload).length > 0) {
            await onUpdate(dirtyPayload); 
        }
        
        onClose();
    };

    const handleClose = () => {
        reset(ticket || INITIAL_TICKET_DATA);
        onClose();
    };

    return (
        <ModalForm
            open={open}
            title="Update Ticket"
            formId={formId}
            onClose={handleClose}
            isLoading={isUpdating || isFetching} 
            submitLabel="Update"
        >
            <form id={formId} onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
                <TicketFields control={control} userOptions={userOptions} />
            </form>
        </ModalForm>
    );
};