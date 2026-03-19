import { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import {
    resetCancelTrigger,
    resetSubmitTrigger,
    setEditStatus,
    setFormDirty,
    showSnackbar,
} from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Box, Divider, Stack, TextField } from '@mui/material';

import { FormField } from '@components/FormField';
import { DESIGNATIONS } from '@containers/SignupComplete';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@schemas';
import { useUpdateUserMutation } from '@service';

import {
    FormGridStack,
    SectionLabel,
    StyledSection,
} from './ProfileForm.styles';
import { FormProps, ProfileFormValues } from './ProfileForm.types';

export const ProfileFormContainer = ({
    displayEmail,
    isEditable,
    userId,
    activeUser,
}: FormProps) => {
    const dispatch = useAppDispatch();
    const { editStatus, isSubmitting, isCancelling } = useAppSelector(
        (state) => state.profile,
    );
    const [updateUser] = useUpdateUserMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, dirtyFields },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        mode: 'onTouched',
    });

    useEffect(() => {
        dispatch(setFormDirty(isDirty));
    }, [isDirty, dispatch]);

    useEffect(() => {
        if (isCancelling || activeUser) {
            reset({
                first_name: activeUser.first_name || '',
                last_name: activeUser.last_name || '',
                date_of_birth: activeUser.date_of_birth ?? '',
                phone: activeUser.phone || '',
                designation: activeUser.designation || '',
                jiraID: activeUser.jiraID || '',
                jira_access_token: activeUser.jira_access_token || '',
            });
            dispatch(resetCancelTrigger());
        }
    }, [isCancelling, activeUser, reset, dispatch]);

    const onSave = useCallback(
        () =>
            handleSubmit(async (submitData) => {
                dispatch(resetSubmitTrigger());

                if (!userId) return;

                const dirtyPayload = Object.keys(dirtyFields).reduce(
                    (acc, key) => {
                        const fieldName = key as keyof ProfileFormValues;
                        let value = submitData[fieldName];

                        if (typeof value === 'string' && value.trim() === '') {
                            value = null;
                        }

                        acc[fieldName] = value;
                        return acc;
                    },
                    {} as Partial<ProfileFormValues>,
                );

                if (Object.keys(dirtyPayload).length === 0) {
                    dispatch(setEditStatus(false));
                    return;
                }

                try {
                    await updateUser({
                        updateData: dirtyPayload,
                        userId,
                    }).unwrap();

                    reset(submitData);
                    dispatch(
                        showSnackbar({
                            message: 'Success',
                            severity: 'success',
                        }),
                    );
                    dispatch(setEditStatus(false));
                } catch {
                    dispatch(
                        showSnackbar({
                            message: 'Update failed',
                            severity: 'error',
                        }),
                    );
                }
            })(),
        [userId, updateUser, reset, dispatch, handleSubmit, dirtyFields],
    );

    useEffect(() => {
        if (isSubmitting) {
            onSave();
        }
    }, [isSubmitting, onSave]);

    return (
        <StyledSection>
            <form
                id="profile-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSave();
                }}
            >
                <FormGridStack spacing={8}>
                    <Box>
                        <SectionLabel>Personal Information</SectionLabel>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={4}
                        >
                            <FormField
                                name="first_name"
                                label="First Name"
                                control={control}
                                editStatus={editStatus}
                                required
                            />
                            <FormField
                                name="last_name"
                                label="Last Name"
                                control={control}
                                editStatus={editStatus}
                                required
                            />
                        </Stack>
                    </Box>
                    <Divider />
                    <Box>
                        <SectionLabel>Contact & Professional</SectionLabel>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={4}
                            mb={4}
                        >
                            <FormField
                                name="designation"
                                label="Designation"
                                type="select"
                                options={DESIGNATIONS}
                                control={control}
                                editStatus={editStatus}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="filled"
                                value={displayEmail}
                                slotProps={{ input: { readOnly: true } }}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={4}
                        >
                            <FormField
                                name="date_of_birth"
                                label="Date of Birth"
                                type="date"
                                control={control}
                                editStatus={editStatus}
                            />
                            <FormField
                                name="phone"
                                label="Phone Number"
                                control={control}
                                editStatus={editStatus}
                            />
                        </Stack>
                    </Box>
                    {isEditable && editStatus && (
                        <>
                            <Divider />
                            <Box>
                                <SectionLabel>Integrations (Jira)</SectionLabel>
                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    spacing={4}
                                >
                                    <FormField
                                        name="jiraID"
                                        label="Jira ID"
                                        control={control}
                                        editStatus={editStatus}
                                    />
                                    <FormField
                                        name="jira_access_token"
                                        label="Jira Access Token"
                                        type="password"
                                        control={control}
                                        editStatus={editStatus}
                                    />
                                </Stack>
                            </Box>
                        </>
                    )}
                </FormGridStack>
            </form>
        </StyledSection>
    );
};
