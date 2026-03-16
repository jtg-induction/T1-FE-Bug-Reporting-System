import { useNavigate } from 'react-router-dom';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip,Stack, Typography } from '@mui/material';

import { TicketCard } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useGetUserTicketsQuery } from '@service';

import { COLUMNS } from './TicketBoard.config';
import {
    StyledBoardContainer,
    StyledColumnHeader,
    StyledColumnWrapper,
} from './TicketBoard.styles';

export const TicketBoard = () => {
    const { data: tickets, isError, isLoading } = useGetUserTicketsQuery({limit: 10, offset: 0, ordering: undefined, filter: undefined});
    const navigate = useNavigate();

    const handleCardClick = (projectId:string, ticketId: string) => {
        navigate(`${PRIVATE_PATHS.PROJECTS}/${projectId}${PRIVATE_PATHS.TICKETS}/${ticketId}`);
    };
    if(isLoading) return (<Typography>Loading..</Typography>)
    if(isError) return (<Typography>Error Fetching data</Typography>)
    const ticketsData = tickets?.data.results ?? [];

    return (
        <StyledBoardContainer>
            {COLUMNS.map((column) => {
                const columnTickets = ticketsData.filter(
                    (ticket) => ticket.status === column.id,
                );

                return (
                    <StyledColumnWrapper key={column.id}>
                        <StyledColumnHeader>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color="text.secondary"
                            >
                                {column.label}
                            </Typography>
                            <Chip
                                label={columnTickets.length}
                                sx={(theme) => ({
                                    fontWeight: 'bold',
                                    backgroundColor: theme.palette.grey[300],
                                })}
                            />
                            {column.label === 'DONE' && (
                                <CheckCircleOutlineIcon
                                    color="success"
                                    fontSize="small"
                                    sx={{ ml: 'auto' }}
                                />
                            )}
                        </StyledColumnHeader>

                        <Stack spacing={2}>
                            {columnTickets.map((ticket) => (
                                <TicketCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    onClick={handleCardClick}
                                    hideDeadline={Boolean(!ticket.deadline) || column.label === 'DONE'}
                                />
                            ))}
                        </Stack>
                    </StyledColumnWrapper>
                );
            })}
        </StyledBoardContainer>
    );
};
