import { Stack, Typography } from '@mui/material';

import { useGetMeQuery } from '@service';

export const DashboardHeader = () => {
    const { data: currentUser } = useGetMeQuery();
    const userData = currentUser?.data;

    return (
        <Stack gap={2}>
            <Typography variant="h2" component="h1">
                Dashboard
            </Typography>

            <Typography color="text.secondary">
                Welcome back, {userData?.first_name}! Here's what's happening in
                your projects.
            </Typography>
        </Stack>
    );
};
