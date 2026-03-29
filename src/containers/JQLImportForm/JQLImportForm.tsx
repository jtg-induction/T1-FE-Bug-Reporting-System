import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    TextField,
} from '@mui/material';

import { FormField, ModalForm } from '@components';
import { EXTERNAL_URLS } from '@constant';
import { useGetJQLTicketsMutation, useImportTicketMutation } from '@service';

import { JQLFormValues, TicketOption } from './JQLImportForm.types';

export const JQLImportContainer = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const { id: projectId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const { control, handleSubmit, getValues } = useForm<JQLFormValues>({
        defaultValues: { jql: '' },
    });

    const [ticketsList, setTicketsList] = useState<TicketOption[]>([]);
    const [nextToken, setNextToken] = useState<string | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(
        null,
    );

    const [getJQLTickets, { isLoading: isFetchingTickets }] =
        useGetJQLTicketsMutation();
    const [importTicket, { isLoading: isImporting }] =
        useImportTicketMutation();

    const fetchTickets = async (
        jqlString: string,
        token: string | null = null,
        isLoadMore = false,
    ) => {
        try {
            const response = await getJQLTickets({
                projectId: projectId,
                data: {
                    jql: jqlString,
                    nextPageToken: token,
                },
            }).unwrap();

            const newTickets = response.data?.results || [];
            const newNextToken = response.data?.nextPageToken || null;

            if (isLoadMore) {
                setTicketsList((prev) => [...prev, ...newTickets]);
            } else {
                setTicketsList(newTickets);
                setSelectedTicket(null);
            }

            setNextToken(newNextToken);
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Search Tickets Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const handleInitialSearch = (values: JQLFormValues) => {
        fetchTickets(values.jql, null, false);
    };

    const handleImport = async () => {
        if (!selectedTicket) return;

        await importTicket({
            projectId: projectId,
            data: { jira_key: selectedTicket.jira_key },
        }).unwrap();

        onClose();
    };

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget;

        const isAtBottom =
            listboxNode.scrollTop + listboxNode.clientHeight ===
            listboxNode.scrollHeight;

        if (isAtBottom && nextToken && !isFetchingTickets) {
            fetchTickets(getValues('jql'), nextToken, true);
        }
    };

    return (
        <ModalForm
            open={open}
            onClose={onClose}
            title="Import Tickets via JQL"
            infoTooltipText="Learn more about JQL"
            infoLink={EXTERNAL_URLS.JQL_GUIDE}
            formId="jql-import-form"
            isLoading={isImporting}
            submitLabel="Import Selected"
        >
            <Box
                component="form"
                id="jql-import-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    void handleImport();
                }}
            >
                <Box mb={3} display="flex" gap={2} alignItems="flex-start">
                    <Box flexGrow={1}>
                        <FormField
                            name="jql"
                            control={control}
                            label="Enter Custom JQL"
                            editStatus={true}
                            placeholder="e.g., status = 'In Progress'"
                            disabled={isFetchingTickets && !nextToken}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => void handleSubmit(handleInitialSearch)()}
                        disabled={isFetchingTickets}
                    >
                        Fetch
                    </Button>
                </Box>

                <Autocomplete
                    options={ticketsList}
                    getOptionLabel={(option) =>
                        `[${option.jira_key}] ${option.title}`
                    }
                    value={selectedTicket}
                    onChange={(_, newValue) => setSelectedTicket(newValue)}
                    isOptionEqualToValue={(option, value) =>
                        option.jira_key === value.jira_key
                    }
                    loading={isFetchingTickets}
                    slotProps={{
                        listbox: {
                            onScroll: handleScroll,
                        },
                    }}
                    renderInput={({ InputProps, ...params }) => (
                        <TextField
                            {...params}
                            label="Select Ticket to Import"
                            placeholder={
                                ticketsList.length === 0
                                    ? 'Click Fetch to load tickets'
                                    : 'Search loaded tickets...'
                            }
                            slotProps={{
                                input: {
                                    ...InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {isFetchingTickets ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            </Box>
        </ModalForm>
    );
};
