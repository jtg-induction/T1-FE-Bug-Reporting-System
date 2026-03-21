import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { CircularProgress, Stack, Typography } from '@mui/material';

import { PRIVATE_PATHS } from '@constant';
import { useRejectInviteMutation } from '@service';

export const RejectInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [rejectInvite, { isLoading, isSuccess, isError }] =
        useRejectInviteMutation();

    useEffect(() => {
        if (!id) return;

        const request = rejectInvite(id);

        return () => {
            request.abort();
        };
    }, [id, rejectInvite]);

    useEffect(() => {
        if (isSuccess) {
            navigate(PRIVATE_PATHS.DASHBOARD);
        }
    }, [isSuccess, navigate]);

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height="100vh"
            spacing={2}
        >
            {(isLoading || (!isSuccess && !isError)) && (
                <>
                    <CircularProgress color="error" />
                    <Typography>Declining invitation...</Typography>
                </>
            )}

            {isError && !isSuccess && (
                <Typography color="error">
                    Failed to decline invitation. The link may have expired or
                    already been processed.
                </Typography>
            )}
        </Stack>
    );
};
