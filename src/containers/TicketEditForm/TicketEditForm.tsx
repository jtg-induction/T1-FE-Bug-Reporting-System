import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { ModalForm } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_TICKET_DATA, TicketFormValues, ticketSchema } from "@schemas";
import { useGetUsersToInviteQuery } from "@service";

import { TicketFormContainerProps } from "./TicketEditForm.types";
import { TicketFields } from "../TicketForm/TicketFields";

export const TicketEditForm = ({ open, onClose, onUpdate, isLoading }: TicketFormContainerProps) => {
    const { id } = useParams<{ id: string }>();
    const formId = 'create-ticket-form';

    const { data: usersResponse } = useGetUsersToInviteQuery(id!, { skip: !id });

    const userOptions = [
        { VALUE: '', LABEL: 'Unassigned' },
        ...(usersResponse?.data?.map(user => ({
            VALUE: user.id,
            LABEL: `${user.first_name} ${user.last_name}`
        })) || [])
    ];

    const { control, handleSubmit, reset } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: INITIAL_TICKET_DATA,
    });

    const handleFormSubmit = async (data: TicketFormValues) => {
        await onUpdate(data);
        reset();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <ModalForm
            open={open}
            title="Create Ticket"
            formId={formId}
            onClose={handleClose}
            isLoading={isLoading}
            submitLabel="Create"
        >
            <form id={formId} onSubmit={(e) => void handleSubmit(() => void handleFormSubmit)(e)}>
                <TicketFields control={control} userOptions={userOptions} />
            </form>
        </ModalForm>
    );
};