import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ErrorOutline } from '@mui/icons-material';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';

import { PRIVATE_PATHS } from '@constant';
import { useRejectInviteMutation } from '@service';
import { getErrorMessage } from '@utils';

export const RejectInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [rejectInvite, { isLoading, isSuccess, isError, error }] =
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
                <>
                    <ErrorOutline color="error" sx={{ fontSize: 60 }} />
                    <Typography color="error" variant="h6" align="center">
                        {getErrorMessage(
                            error,
                            'Failed to decline invitation. The link may have expired or already been processed.',
                        )}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => void navigate(PRIVATE_PATHS.DASHBOARD)}
                    >
                        Return to Dashboard
                    </Button>
                </>
            )}
        </Stack>
    );
};
