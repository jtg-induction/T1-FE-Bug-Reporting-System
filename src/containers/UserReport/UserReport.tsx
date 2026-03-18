import { Stack } from '@mui/material';

import {
    UserDeadlineChartContainer,
    UserPriorityChartContainer,
    UserStatusChartContainer,
} from '@containers';

export const UserReportContainer = () => (
        <Stack gap={3}>
            <UserStatusChartContainer />
            <UserPriorityChartContainer />
            <UserDeadlineChartContainer />
        </Stack>
    );
