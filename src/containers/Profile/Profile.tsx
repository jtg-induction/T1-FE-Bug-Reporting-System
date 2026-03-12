import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { profileSchema } from 'schemas';

import { AlertColor } from '@mui/material';

import { ProfileView } from '@components';
import { ProfileFormValues } from '@components/ProfileView/ProfileView.types';
import { PRIVATE_PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useGetMeQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from '@service';

export const ProfileContainer = () => {
    // --- 1. STATES ---
    const [editStatus, setEditStatus] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: '' as AlertColor,
    });

    // --- 2. HOOKS ---
    const { userId } = useParams<{ userId: string }>();

    const { data: getMeResponse } = useGetMeQuery();
    const currentUser = getMeResponse?.data;
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const { data: getUserResponse, error } = useGetUserQuery(userId || '', {
        skip: !userId || userId === currentUser?.id,
    });

    const user = getUserResponse?.data;

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        mode: 'onTouched',
    });

    useEffect(() => {
        const activeUser = userId === currentUser?.id ? currentUser : user;
        if (activeUser) {
            form.reset({
                first_name: activeUser.first_name || '',
                last_name: activeUser.last_name || '',
                date_of_birth: activeUser.date_of_birth ?? '',
                phone: activeUser.phone || '',
                designation: activeUser.designation || '',
            });
        }
    }, [user, currentUser, userId, form]);

    // --- 3. FUNCTION DECLARATIONS ---
    const handleSave = async (submitData: ProfileFormValues) => {
        if (!userId) return;
        try {
            const payload = {
                ...submitData,
                date_of_birth:
                    submitData.date_of_birth?.trim() === ''
                        ? null
                        : submitData.date_of_birth,
                phone:
                    submitData.phone?.trim() === '' ? null : submitData.phone,
            };
            await updateUser({ updateData: payload, userId }).unwrap();
            setSnackbar({
                open: true,
                message: 'Profile updated successfully',
                severity: 'success',
            });
            setEditStatus(false);
        } catch {
            setSnackbar({
                open: true,
                message: 'Update failed',
                severity: 'error',
            });
        }
    };

    const handleCancel = () => {
        setEditStatus(false);
        form.reset();
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (error) return <Navigate to={PRIVATE_PATHS.PROFILE} />;

    return (
        <ProfileView
            form={form}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            isUpdatingUser={isUpdatingUser}
            isEditable={Boolean(
                (user && user.is_owner) ||
                    (currentUser && currentUser.id === userId),
            )}
            onSave={form.handleSubmit(handleSave)}
            onCancel={handleCancel}
            snackbar={snackbar}
            onSnackbarClose={handleSnackbarClose}
            displayEmail={user?.email || currentUser?.email || ''}
        />
    );
};
