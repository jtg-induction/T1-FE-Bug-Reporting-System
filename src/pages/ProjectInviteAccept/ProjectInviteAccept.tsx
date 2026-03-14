import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { useAcceptInviteMutation } from '@service';

export const AcceptInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [acceptInvite, { isLoading, isSuccess, isError }] =
        useAcceptInviteMutation();

    useEffect(() => {
        if (id) {
            acceptInvite(id);
        }
    }, [id, acceptInvite]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate(`/projects/${id}`);
            }, 5000);
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
                    <CheckCircleOutlineIcon color="success" fontSize="medium" />
                    <Typography variant="h4">Invitation Accepted!</Typography>
                    <Typography color="text.secondary">
                        Redirecting to your project dashboard in 5 seconds...
                    </Typography>
                </>
            )}
            {isError && (
                <Typography color="error">
                    Failed to accept invitation. The link may have expired.
                </Typography>
            )}
        </Stack>
    );
};
