import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@mui/material';

import { FormField, ModalForm } from '@components';
import { useGetJQLTicketsMutation, useImportTicketMutation } from '@service';

import { JQLFormValues } from './JQLImportForm.types';

export const JQLImportContainer = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const { id: projectId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<JQLFormValues>({
        defaultValues: { jql: '' },
    });

    const [getJQLTickets, { data: tickets, isLoading: isFetchingTickets }] =
        useGetJQLTicketsMutation();
    const [importTicket, { isLoading: isImporting }] =
        useImportTicketMutation();

    const handleSearch = async (values: JQLFormValues) => {
        try {
            await getJQLTickets({
                projectId: projectId,
                data: { jql: values.jql },
            }).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Search Tickets Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const handleImport = async (ticketKey: string) => {
        try {
            await importTicket({
                projectId: projectId,
                data: { jira_id: ticketKey },
            }).unwrap();
            onClose();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Import Ticket Failed',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <ModalForm
            open={open}
            onClose={onClose}
            title="Import Tickets via JQL"
            formId="jql-search-form"
            isLoading={isImporting}
            submitLabel="Search"
        >
            <Box
                component="form"
                id="jql-search-form"
                onSubmit={(e) => void handleSubmit(handleSearch)(e)}
                sx={{ mb: 3 }}
            >
                <FormField
                    name="jql"
                    control={control}
                    label="Enter JQL"
                    editStatus={true}
                    placeholder="Leave empty to fetch all tickets"
                    disabled={isFetchingTickets}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxHeight: '400px',
                    overflowY: 'auto',
                    pr: 1,
                }}
            >
                {isFetchingTickets && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
                    >
                        <CircularProgress size={32} />
                    </Box>
                )}

                {!isFetchingTickets &&
                    tickets?.data?.map((ticket) => (
                        <Card
                            key={ticket.id}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 1.5,
                                transition: '0.2s',
                                '&:hover': { borderColor: 'primary.main' },
                            }}
                        >
                            <CardContent sx={{ p: '0 !important' }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {ticket.jira_key}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {ticket.title}
                                </Typography>
                            </CardContent>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() =>
                                    void handleImport(ticket.jira_key)
                                }
                                disabled={isImporting}
                            >
                                Import
                            </Button>
                        </Card>
                    ))}

                {!isFetchingTickets &&
                    tickets?.data &&
                    tickets.data.length === 0 && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            sx={{ py: 4 }}
                        >
                            No results found.
                        </Typography>
                    )}
            </Box>
        </ModalForm>
    );
};
