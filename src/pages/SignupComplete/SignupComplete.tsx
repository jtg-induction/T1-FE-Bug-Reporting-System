import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignupMutation } from 'redux/apiSlice';
import { setCredentials } from 'redux/features/authSlice';

import { Alert, MenuItem, Stack, TextField } from '@mui/material';

import { FormBackground, FormComponent, PasswordTextField } from '@components';

import {
    DESIGNATIONS,
    INITIAL_FORM_DATA,
    SIGNUP_COMPLETE,
    VALIDATION_REGEX,
} from './SignupComplete.config';

export const SignupCompletePage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const [signup, { isLoading: isRegistering, error: registerError }] =
        useSignupMutation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
            if (errors[field]) {
                setErrors({ ...errors, [field]: '' });
            }
        };

    const handlePasswordChange = (field: string) => (value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
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

        if (formData.phone && !VALIDATION_REGEX.phone.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number';
        }

        if (formData.designation === '') {
            newErrors.designation = 'Designation is required';
        }

        if (!formData.jiraID.trim()) {
            newErrors.jiraID = 'Jira ID is required';
        }

        if (!formData.jira_access_token.trim()) {
            newErrors.jira_access_token = 'Jira Access Token is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if (e) {
            e.preventDefault();
        }

        const isValid = validateForm();

        if (isValid && token && email) {
            try {
                const submitData = {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email,
                    token,
                    date_of_birth: formData.date_of_birth || null,
                    phone: formData.phone || null,
                    designation: formData.designation,
                    jiraID: formData.jiraID,
                    jira_access_token: formData.jira_access_token,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                };
                const data = await signup(submitData).unwrap();
                dispatch(setCredentials(data));
                navigate('/');
            } catch {
                // registerError from useSignupMutation handles the Alert UI
            }
        }
    };

    return (
        <FormBackground>
            <FormComponent
                title={SIGNUP_COMPLETE.title}
                buttonText={
                    isRegistering
                        ? SIGNUP_COMPLETE.status.registering
                        : SIGNUP_COMPLETE.status.idle
                }
                onClick={handleSubmit}
            >
                <Stack spacing={3} width="100%">
                    {registerError ? (
                        <Alert severity="error">
                            {typeof registerError === 'string'
                                ? registerError
                                : SIGNUP_COMPLETE.messages.defaultError}
                        </Alert>
                    ) : null}

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            autoComplete="given-name"
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
                            variant="outlined"
                            autoComplete="family-name"
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
                            variant="outlined"
                            slotProps={{ inputLabel: { shrink: true } }}
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
                            variant="outlined"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            select
                            id="designation"
                            name="designation"
                            label="Designation"
                            variant="outlined"
                            value={formData.designation}
                            onChange={handleChange('designation')}
                            error={Boolean(errors.designation)}
                            helperText={errors.designation}
                        >
                            {DESIGNATIONS.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            id="jiraID"
                            name="jiraID"
                            label="Jira ID"
                            type="text"
                            variant="outlined"
                            value={formData.jiraID}
                            onChange={handleChange('jiraID')}
                            error={Boolean(errors.jiraID)}
                            helperText={errors.jiraID}
                        />
                        <TextField
                            fullWidth
                            id="jira_access_token"
                            name="jira_access_token"
                            label="Jira Access Token"
                            type="text"
                            variant="outlined"
                            value={formData.jira_access_token}
                            onChange={handleChange('jira_access_token')}
                            error={Boolean(errors.jira_access_token)}
                            helperText={errors.jira_access_token}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <PasswordTextField
                            label="Password"
                            value={formData.password}
                            onChange={handlePasswordChange('password')}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                        <PasswordTextField
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handlePasswordChange('confirmPassword')}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                        />
                    </Stack>
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
