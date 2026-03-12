import { useEffect, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';
import {
    useGetMeQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from 'redux/apiSlice';
import { UserData, UserProfileData } from 'types/common';

import { Cancel, Done, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    MenuItem,
    Snackbar,
    SnackbarCloseReason,
    Stack,
    TextField,
    TextFieldVariants,
    Typography,
} from '@mui/material';

import { VALIDATION_REGEX } from '@constant';
import { DESIGNATIONS } from '@containers';

import { INITIAL_USER_DATA } from './Profile.config';
import { StyledSection } from './Profile.style';

export const Profile = () => {
    const { data: currentUser } = useGetMeQuery();
    const { userId } = useParams<{ userId: string }>();
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
    const { data, isSuccess, error } = useGetUserQuery(userId, {
        skip: userId == currentUser?.id,
    });

    const handleChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
            if (errors[field]) {
                setErrors({ ...errors, [field]: '' });
            }
        };

    const handleEdit = () => {
        setEditStatus(true);
        setVariant('outlined');
    };

    const handleCancel = () => {
        setEditStatus(false);
        if (isSuccess && data) setFormData(data);
        setVariant('filled');
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        } else if (formData.first_name.trim().length < 2) {
            newErrors.first_name = 'First name cannot be a single character';
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        } else if (formData.last_name.trim().length < 2) {
            newErrors.last_name = 'Last name cannot be a single character';
        }

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = 'Date of birth is required';
        }

        if (formData.phone && !formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (
            formData.phone &&
            !VALIDATION_REGEX.PHONE.test(formData.phone)
        ) {
            newErrors.phone = 'Enter a valid phone number';
        }

        if (formData.designation === '') {
            newErrors.designation = 'Designation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleComplete = (e?: React.SyntheticEvent): void => {
        if (e) {
            e.preventDefault();
        }

        const isValid = validateForm();

        if (isValid) {
            const submitData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                date_of_birth: formData.date_of_birth || null,
                phone: formData.phone || null,
                designation: formData.designation,
            };

            setEditStatus(false);
            setVariant('filled');

            if (userId) updateUser({ updateData: submitData, userId });
            setSnackbarOpen(true);
        }
    };

    const [formData, setFormData] = useState<UserData | UserProfileData>(
        INITIAL_USER_DATA,
    );
    useEffect(() => {
        if (currentUser && userId == currentUser.id) {
            setFormData(currentUser);
        } else if (data) {
            setFormData(data);
        }
    }, [data, currentUser]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [editStatus, setEditStatus] = useState(false);
    const [inputVariant, setVariant] = useState<TextFieldVariants>('filled');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = (
        _: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    if (error) {
        return <Navigate to="/profile" />;
    }

    return (
        <>
            {(data && data.is_owner) ||
                (currentUser && currentUser.id == userId && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        padding={4}
                        justifyContent="space-between"
                    >
                        <Typography>Welcome User</Typography>
                        <Box>
                            {!editStatus ? (
                                <Button
                                    sx={{ minWidth: 0, padding: 0 }}
                                    onClick={handleEdit}
                                    color="inherit"
                                >
                                    <Edit />
                                </Button>
                            ) : (
                                <Button onClick={handleCancel} color="inherit">
                                    <Cancel />
                                </Button>
                            )}
                            {editStatus && (
                                <Button
                                    onClick={handleComplete}
                                    color="inherit"
                                >
                                    <Done />
                                </Button>
                            )}
                        </Box>
                    </Stack>
                ))}
            <StyledSection>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        variant={inputVariant}
                        slotProps={{
                            input: {
                                readOnly: !editStatus,
                            },
                        }}
                        value={formData.first_name}
                        onChange={handleChange('first_name')}
                        error={Boolean(errors.first_name)}
                        helperText={errors.first_name}
                    />
                    <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        variant={inputVariant}
                        autoComplete="family-name"
                        slotProps={{
                            input: {
                                readOnly: !editStatus,
                            },
                        }}
                        value={formData.last_name}
                        onChange={handleChange('last_name')}
                        error={Boolean(errors.last_name)}
                        helperText={errors.last_name}
                    />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        id="date_of_birth"
                        name="date_of_birth"
                        label="Date of Birth"
                        type="date"
                        variant={inputVariant}
                        slotProps={{
                            input: {
                                readOnly: !editStatus,
                            },
                            inputLabel: { shrink: true },
                        }}
                        value={formData.date_of_birth}
                        onChange={handleChange('date_of_birth')}
                        error={Boolean(errors.date_of_birth)}
                        helperText={errors.date_of_birth}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        variant={inputVariant}
                        autoComplete="tel"
                        slotProps={{
                            input: {
                                readOnly: !editStatus,
                            },
                        }}
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        select={editStatus}
                        id="designation"
                        name="designation"
                        label="Designation"
                        variant={inputVariant}
                        slotProps={{
                            input: {
                                readOnly: !editStatus,
                            },
                        }}
                        value={formData.designation}
                        onChange={handleChange('designation')}
                        error={Boolean(errors.designation)}
                        helperText={errors.designation}
                    >
                        {DESIGNATIONS.map(
                            (option: { VALUE: string; LABEL: string }) => (
                                <MenuItem
                                    key={option.VALUE}
                                    value={option.VALUE}
                                >
                                    {option.LABEL}
                                </MenuItem>
                            ),
                        )}
                    </TextField>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email ID"
                        type="text"
                        variant="filled"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                </Stack>
            </StyledSection>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={
                    isUpdatingUser
                        ? 'Updating User Profile'
                        : 'User Profile Updated'
                }
            />
        </>
    );
};
