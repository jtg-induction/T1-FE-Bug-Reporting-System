import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Alert, Stack, Typography } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { useGetMovableProjectsQuery } from '@service';

import { MoveTicketFormProps, MoveTicketValues } from './MoveTicket.types';

export const MoveTicketContainer = ({
    open,
    onClose,
    onMove,
    isLoading,
    currentProjectName
}: MoveTicketFormProps) => {
    const { pid: currentPid } = useParams<{ pid: string }>();
    const { tid: currentTid } = useParams<{ tid: string }>();
    const formId = 'move-ticket-form';

    const { data: projectsResponse, isLoading: isFetchingProjects } = useGetMovableProjectsQuery({ projectId: currentPid, ticketId: currentTid });

    const rawProjects = projectsResponse?.data ?? [];

    const projectOptions = rawProjects
        .filter((p) => p.id !== currentPid)
        .map((p) => ({
            LABEL: `${p.title} (Key - ${p.key})`,
            VALUE: p.id
        }));

    const { control, handleSubmit, reset } = useForm<MoveTicketValues>({
        defaultValues: { projectId: '' }
    });

    const onSubmit = async (data: MoveTicketValues) => {
        await onMove(data.projectId);
        reset();
        onClose();
    };

    return (
        <ModalForm
            open={open}
            title="Move Ticket to Project"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading || isFetchingProjects}
            submitLabel="Move Ticket"
        >
            <form id={formId} onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
                <Stack spacing={3} pt={1}>
                    <Alert severity="info">
                        Moving this ticket will transfer it from <strong>{currentProjectName || 'the current project'}</strong> to the selected project.
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