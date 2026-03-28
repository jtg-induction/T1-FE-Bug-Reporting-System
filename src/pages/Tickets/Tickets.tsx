import { Stack } from '@mui/material';

import { TicketBoard } from '@containers';
import { TicketsHeader } from '@containers';

export const TicketPage = () => (
    <Stack
        sx={(theme) => ({
            padding: '16px 160px',
            [theme.breakpoints.down('md')]: { padding: '10px 24px' },
            gap: '20px',
        })}
    >
        <TicketsHeader />
        <TicketBoard />
    </Stack>
);
