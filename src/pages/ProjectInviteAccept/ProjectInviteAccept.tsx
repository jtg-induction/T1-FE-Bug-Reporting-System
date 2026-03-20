import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { CheckCircleOutline } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { useAcceptInviteMutation } from '@service';

export const AcceptInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [acceptInvite, { isLoading, isSuccess, isError }] =
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
            const timer = setTimeout(() => {
                navigate(`/projects/${id}`);
            }, 1000);
            return () => clearTimeout(timer);
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
                    <CheckCircleOutline color="success" fontSize="medium" />
                    <Typography variant="h4">Invitation Accepted!</Typography>
                    <Typography color="text.secondary">
                        Redirecting to your project dashboard ...
                    </Typography>
                </>
            )}
            {isError && !isSuccess && (
                <Typography color="error">
                    Failed to accept invitation. The link may have expired.
                </Typography>
            )}
        </Stack>
    );
};
