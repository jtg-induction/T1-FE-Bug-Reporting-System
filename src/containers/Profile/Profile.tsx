import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Navigate,useParams } from 'react-router-dom';

import { ProfileView } from '@components';
import { ProfileFormValues, profileSchema } from '@components/ProfileView/ProfileView.types';
import { privatePaths } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetMeQuery, useGetUserQuery, useUpdateUserMutation } from '@service';

export const ProfileContainer = () => {
    // --- 1. STATES ---
    const [editStatus, setEditStatus] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    // --- 2. HOOKS ---
    const { userId } = useParams<{ userId: string }>();

    const { data: currentUser } = useGetMeQuery();

    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const { data, error } = useGetUserQuery(userId || '', {
        skip: !userId || userId === currentUser?.id
    });

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        mode: 'onTouched',
    });

    useEffect(() => {
        const activeUser = userId === currentUser?.id ? currentUser : data;
        if (activeUser) {
            form.reset({
                first_name: activeUser.first_name || '',
                last_name: activeUser.last_name || '',
                date_of_birth: activeUser.date_of_birth ?? '',
                phone: activeUser.phone || '',
                designation: activeUser.designation || '',
            });
        }
    }, [data, currentUser, userId, form]);

    // --- 3. FUNCTION DECLARATIONS ---
    const handleSave = async (submitData: ProfileFormValues) => {
        if (!userId) return;
        try {
            const payload = {
                ...submitData,
                date_of_birth: submitData.date_of_birth?.trim() === '' ? null : submitData.date_of_birth,
                phone: submitData.phone?.trim() === '' ? null : submitData.phone,
            };
            await updateUser({ updateData: payload, userId }).unwrap();
            setSnackbar({ open: true, message: 'Profile updated successfully' });
            setEditStatus(false);
        } catch {
            setSnackbar({ open: true, message: 'Update failed' });
        }
    };

    const handleCancel = () => {
        setEditStatus(false);
        form.reset();
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (error) return <Navigate to={privatePaths.profile} />;

    return (
        <ProfileView
            form={form}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            isUpdatingUser={isUpdatingUser}
            isEditable={Boolean((data && data.is_owner) || (currentUser && currentUser.id === userId))}
            onSave={form.handleSubmit(handleSave)}
            onCancel={handleCancel}
            snackbar={snackbar}
            onSnackbarClose={handleSnackbarClose}
            displayEmail={data?.email || currentUser?.email || ''}
        />
    );
};