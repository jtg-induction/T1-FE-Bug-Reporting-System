import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';

import { PRIVATE_PATHS } from '@constant';
import { useAcceptInviteMutation } from '@service';
import { getErrorMessage } from '@utils';

export const AcceptInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [acceptInvite, { isLoading, isSuccess, isError, error }] =
        useAcceptInviteMutation();

    useEffect(() => {
        if (!id) return;
        const request = acceptInvite(id);
        return () => {
            request.abort();
        };
    }, [id, acceptInvite]);

    useEffect(() => {
        if (isSuccess) {
            navigate(`${PRIVATE_PATHS.PROJECTS}${id}`);
        }
    }, [isSuccess, id, navigate]);

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height="100vh"
            spacing={2}
        >
            {isLoading && (
                <>
                    <CircularProgress />
                    <Typography>Joining project...</Typography>
                </>
            )}
            {isSuccess && (
                <>
                    <CheckCircleOutline color="success" sx={{ fontSize: 60 }} />
                    <Typography variant="h4">Invitation Accepted!</Typography>
                    <Typography color="text.secondary">
                        Redirecting to your project dashboard ...
                    </Typography>
                </>
            )}
            {isError && !isSuccess && (
                <>
                    <ErrorOutline color="error" sx={{ fontSize: 60 }} />
                    <Typography color="error" variant="h6" align="center">
                        {getErrorMessage(
                            error,
                            'Failed to accept invitation. The link may have expired.',
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
