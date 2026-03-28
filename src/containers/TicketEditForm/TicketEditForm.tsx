import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { TICKET_SEVERITY_OPTIONS, TICKET_STATUS_OPTIONS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { INITIAL_TICKET_DATA, TicketFormValues, ticketSchema } from '@schemas';
import {
    useGetProjectMembersQuery,
    useGetTicketQuery,
    useUpdateTicketMutation,
} from '@service';

import { TicketFormContainerProps } from './TicketEditForm.types';

export const TicketEditForm = ({ open, onClose }: TicketFormContainerProps) => {
    const { pid: projectId, tid: ticketId } = useParams<{
        pid: string;
        tid: string;
    }>();
    const formId = 'update-ticket-form';
    const dispatch = useAppDispatch();
    const { data: ticketData, isLoading: isFetching } = useGetTicketQuery(
        { projectId: projectId!, ticketId: ticketId! },
        { skip: !projectId || !ticketId },
    );
    const { data: usersResponse } = useGetProjectMembersQuery(
        { projectId: projectId! },
        { skip: !projectId },
    );
    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
    const ticket = ticketData?.data;
    const members = usersResponse?.data;
    const perm = ticket?.permission_class;
    const userOptions = [
        { VALUE: '', LABEL: 'Unassigned' },
        ...(members?.results?.map((user) => ({
            VALUE: user.member.id,
            LABEL: `${user.member.first_name} ${user.member.last_name}`,
        })) || []),
    ];

    const {
        control,
        handleSubmit,
        reset,
        formState: { dirtyFields },
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
            try {
                await updateTicket({
                    projectId: projectId!,
                    ticketId: ticketId!,
                    updateData: dirtyPayload,
                }).unwrap();
                onClose();
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Ticket Updation Failed',
                        severity: 'error',
                    }),
                );
            }
        }
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
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {perm >= 3 && (
                        <>
                            <FormField
                                name="title"
                                label="Title"
                                control={control}
                                editStatus={true}
                            />
                            <FormField
                                name="description"
                                label="Description"
                                control={control}
                                editStatus={true}
                                multiline
                                rows={3}
                            />
                        </>
                    )}

                    <Stack direction="row" spacing={2}>
                        {perm >= 2 && (
                            <FormField
                                name="status"
                                label="Status"
                                type="select"
                                control={control}
                                editStatus={true}
                                options={
                                    ticket.permission_class === 4
                                        ? TICKET_STATUS_OPTIONS
                                        : TICKET_STATUS_OPTIONS.filter(
                                              (option) => option.VALUE < 4,
                                          )
                                }
                                fullWidth
                            />
                        )}
                        {perm >= 3 && (
                            <FormField
                                name="severity"
                                label="Severity"
                                type="select"
                                control={control}
                                editStatus={true}
                                options={TICKET_SEVERITY_OPTIONS}
                                fullWidth
                            />
                        )}
                    </Stack>

                    {perm >= 3 && (
                        <>
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
                        </>
                    )}
                </Stack>
            </form>
        </ModalForm>
    );
};
