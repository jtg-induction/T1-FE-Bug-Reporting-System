import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { CircularProgress, Stack, Typography } from '@mui/material';

import { useRejectInviteMutation } from '@service';

export const RejectInvitePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [rejectInvite, { isSuccess }] = useRejectInviteMutation();

    useEffect(() => {
        if (id) {
            rejectInvite(id);
        }
    }, [id, rejectInvite]);

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <Stack alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress color="error" />
            <Typography>Declining invitation...</Typography>
        </Stack>
    );
};
