import { useEffect, useState } from 'react';

import { useCompleteRegistration, useVerifyInvite } from 'apiService/requests';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
    Alert,
    CircularProgress,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { PasswordTextField } from '@containers';

import {
    DESIGNATIONS,
    INITIAL_FORM_DATA,
    SIGNUP_COMPLETE,
    VALIDATION_REGEX,
} from './SignupComplete.config';
import {
    ActionButton,
    CenteredContainer,
    InvalidIcon,
    InvalidLinkContainer,
} from './SignupComplete.styles';
import { TokenStatus } from './SignupComplete.types';

export const SignupCompletePage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const {
        verifyToken,
        isLoading: isVerifying,
        data: verifyData,
        error: verifyError,
    } = useVerifyInvite();

    const {
        registerUser,
        isLoading: isRegistering,
        data: registerData,
        error: registerError,
    } = useCompleteRegistration();

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (token && email) {
            verifyToken(token, email);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, email]);

    let derivedTokenStatus: TokenStatus = 'loading';
    if (!token || !email || verifyError) {
        derivedTokenStatus = 'invalid';
    } else if (verifyData) {
        derivedTokenStatus = 'valid';
    }

    useEffect(() => {
        if (registerData) {
            navigate(SIGNUP_COMPLETE.routes.loginSuccess);
        }
    }, [registerData, navigate]);

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

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = 'Date of birth is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!VALIDATION_REGEX.phone.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number';
        }

        if (formData.designation === '') {
            newErrors.designation = 'Designation is required';
        }

        if (!formData.jiraID.trim()) {
            newErrors.jiraID = 'Jira ID is required';
        } else if (!VALIDATION_REGEX.jira.test(formData.jiraID)) {
            newErrors.jiraID = 'Enter a valid Jira ID';
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

    const handleSubmit = (e?: React.SyntheticEvent): void => {
        if (e) {
            e.preventDefault();
        }

        const isValid = validateForm();

        if (isValid && token && email) {
            const submitData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: email,
                token: token,
                date_of_birth: formData.date_of_birth || null,
                phone: formData.phone || null,
                designation: formData.designation,
                jiraID: formData.jiraID,
                password: formData.password,
                confirm_password: formData.confirmPassword,
            };

            void registerUser(token, submitData as any);
        }
    };

    if (derivedTokenStatus === 'loading' || isVerifying) {
        return (
            <CenteredContainer>
                <CircularProgress color="error" />
                <Typography color="text.secondary">
                    {SIGNUP_COMPLETE.messages.loadingText}
                </Typography>
            </CenteredContainer>
        );
    }

    if (derivedTokenStatus === 'invalid') {
        return (
            <InvalidLinkContainer>
                <InvalidIcon />
                <Typography variant="h4" gutterBottom>
                    {SIGNUP_COMPLETE.messages.invalidTitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {SIGNUP_COMPLETE.messages.invalidBody}
                </Typography>
                <ActionButton
                    variant="contained"
                    onClick={() => {
                        void navigate(SIGNUP_COMPLETE.routes.requestInvite);
                    }}
                >
                    {SIGNUP_COMPLETE.messages.invalidButton}
                </ActionButton>
            </InvalidLinkContainer>
        );
    }

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
