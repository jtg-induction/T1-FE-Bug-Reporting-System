import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { TICKET_SEVERITY_OPTIONS, TICKET_STATUS_OPTIONS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { INITIAL_TICKET_DATA, TicketFormValues, ticketSchema } from '@schemas';
import { useCreateTicketMutation, useGetProjectMembersQuery } from '@service';

import { TicketFormContainerProps } from './TicketForm.types';

export const TicketFormContainer = ({
    open,
    onClose,
}: TicketFormContainerProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const formId = 'create-ticket-form';

    const [createTicket, { isLoading: isCreatingTicket }] =
        useCreateTicketMutation();

    const { data: usersResponse } = useGetProjectMembersQuery(
        { projectId: id! },
        { skip: !id },
    );
    const members = usersResponse?.data;
    const userOptions = [
        { VALUE: '', LABEL: 'Unassigned' },
        ...(members?.results?.map((user) => ({
            VALUE: user.member.id,
            LABEL: `${user.member.first_name} ${user.member.last_name}`,
        })) || []),
    ];

    const { control, handleSubmit, reset } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: INITIAL_TICKET_DATA,
    });

    const handleFormSubmit = async (data: TicketFormValues) => {
        if (!id) return;
        try {
            await createTicket({
                ...data,
                project_id: id,
            }).unwrap();
            onClose();
            reset();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Ticket Creation Failed',
                    severity: 'error',
                }),
            );
        }
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
            isLoading={isCreatingTicket}
            submitLabel="Create"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <FormField
                        required
                        name="title"
                        label="Title"
                        control={control}
                        editStatus={true}
                    />
                    <FormField
                        required
                        name="description"
                        label="Description"
                        control={control}
                        editStatus={true}
                        multiline
                        rows={3}
                    />

                    <Stack direction="row" spacing={2}>
                        <FormField
                            required
                            name="status"
                            label="Status"
                            type="select"
                            control={control}
                            editStatus={true}
                            options={TICKET_STATUS_OPTIONS}
                            fullWidth
                        />
                        <FormField
                            required
                            name="severity"
                            label="Severity"
                            type="select"
                            control={control}
                            editStatus={true}
                            options={TICKET_SEVERITY_OPTIONS}
                            fullWidth
                        />
                    </Stack>

                    <FormField
                        name="assignee"
                        label="Assignee"
                        type="select"
                        control={control}
                        editStatus={true}
                        options={userOptions}
                    />

                    <FormField
                        name="deadline"
                        label="Deadline"
                        type="date"
                        control={control}
                        editStatus={true}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
