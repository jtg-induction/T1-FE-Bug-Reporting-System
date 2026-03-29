import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Stack, Typography } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMovableProjectsQuery, useUpdateTicketMutation } from '@service';

import { MoveTicketFormProps, MoveTicketValues } from './MoveTicket.types';

export const MoveTicketContainer = ({ open, onClose }: MoveTicketFormProps) => {
    const { pid: currentPid } = useParams<{ pid: string }>();
    const { tid: currentTid } = useParams<{ tid: string }>();
    const formId = 'move-ticket-form';
    const navigate = useNavigate();
    const { data: projectsResponse, isLoading: isFetchingProjects } =
        useGetMovableProjectsQuery(
            currentPid && currentTid
                ? { projectId: currentPid, ticketId: currentTid }
                : skipToken,
        );

    const rawProjects = projectsResponse?.data ?? [];

    const projectOptions = rawProjects
        .filter((p) => p.id !== currentPid)
        .map((p) => ({
            LABEL: `${p.title} (Key - ${p.key})`,
            VALUE: p.id,
        }));

    const { control, handleSubmit, reset } = useForm<MoveTicketValues>({
        defaultValues: { projectId: '' },
    });

    useEffect(() => {
        if (projectOptions.length > 0) {
            reset({ projectId: projectOptions[0].VALUE });
        }
    });

    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
    const onSubmit = async (data: MoveTicketValues) => {
        await updateTicket({
            projectId: currentPid!,
            ticketId: currentTid!,
            updateData: {
                project_id: data.projectId,
            },
        }).unwrap();

        reset();
        onClose();
        navigate(
            `${PRIVATE_PATHS.PROJECTS}/${data.projectId}${PRIVATE_PATHS.TICKETS}/${currentTid}`,
        );
    };

    return (
        <ModalForm
            open={open}
            title="Move Ticket to Project"
            formId={formId}
            onClose={onClose}
            isLoading={isUpdating || isFetchingProjects}
            submitLabel="Move Ticket"
        >
            <form id={formId} onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
                <Stack spacing={3} pt={1}>
                    <Alert severity="info">
                        Moving this ticket will transfer it from{' '}
                        <strong>{'the current project'}</strong> to the selected
                        project.
                    </Alert>

                    {projectOptions.length > 0 ? (
                        <FormField
                            name="projectId"
                            control={control}
                            label="Select Target Project"
                            type="select"
                            editStatus={true}
                            options={projectOptions}
                        />
                    ) : (
                        <Typography variant="body2" color="error">
                            No other projects available to move this ticket to.
                        </Typography>
                    )}
                </Stack>
            </form>
        </ModalForm>
    );
};
