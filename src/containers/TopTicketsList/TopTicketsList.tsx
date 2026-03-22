import { useNavigate } from 'react-router-dom';

import { TrendingUp } from '@mui/icons-material';
import {
    Box,
    Chip,
    CircularProgress,
    List,
    Stack,
    Typography,
} from '@mui/material';

import { ListCard, SectionCard } from '@components';
import { PRIVATE_PATHS, TICKET_STATUS_MAP } from '@constant';
import { useGetUserTicketsQuery } from '@service';
import { getTimeFromNow } from '@utils';

import {
    HeaderStack,
    ListFooterContainer,
    ViewAllButton,
} from './TopTicketsList.styles';

export const TopTicketsList = () => {
    const navigate = useNavigate();
    const { data: topTickets, isLoading } = useGetUserTicketsQuery({
        limit: 5,
        offset: 0,
        ordering: undefined,
        filter: {},
    });
    const ticketsData = topTickets?.data.results ?? [];

    return (
        <SectionCard
            titleContent={
                <HeaderStack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        pb={2}
                    >
                        <TrendingUp color="primary" />
                        <Typography variant="h2">Top Tickets</Typography>
                    </Stack>
                </HeaderStack>
            }
            mainContent={
                <Stack sx={{ justifyContent: 'space-between', height: '100%' }}>
                    <Box sx={{ mt: 1 }}>
                        {isLoading ? (
                            <Stack alignItems="center" sx={{ py: 5 }}>
                                <CircularProgress size={28} thickness={5} />
                            </Stack>
                        ) : (
                            <List disablePadding>
                                {ticketsData.length > 0 ? (
                                    ticketsData.map((ticket) => (
                                        <ListCard
                                            key={ticket.id}
                                            title={ticket.title}
                                            subtitle={`Created ${getTimeFromNow(ticket.created_at)} ago`}
                                            Info={
                                                <Chip
                                                    size="small"
                                                    color={
                                                        TICKET_STATUS_MAP[
                                                            ticket.status
                                                        ][1]
                                                    }
                                                    label={
                                                        TICKET_STATUS_MAP[
                                                            ticket.status
                                                        ][0]
                                                    }
                                                />
                                            }
                                            handleOnClick={() =>
                                                void navigate(
                                                    `${PRIVATE_PATHS.PROJECTS}/${ticket.project_id}${PRIVATE_PATHS.TICKETS}/${ticket.id}`,
                                                )
                                            }
                                        />
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        sx={{ p: 4, textAlign: 'center' }}
                                        color="text.secondary"
                                    >
                                        No top tickets to display.
                                    </Typography>
                                )}
                            </List>
                        )}
                    </Box>

                    {!isLoading && (
                        <ListFooterContainer>
                            <ViewAllButton
                                onClick={() =>
                                    void navigate(PRIVATE_PATHS.TICKETS)
                                }
                                color="inherit"
                            >
                                VIEW ALL TICKETS
                            </ViewAllButton>
                        </ListFooterContainer>
                    )}
                </Stack>
            }
        />
    );
};
