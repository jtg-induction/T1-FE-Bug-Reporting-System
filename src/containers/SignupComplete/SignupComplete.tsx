import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignupMutation } from 'redux/apiSlice';
import { setCredentials } from 'redux/features/authSlice';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
} from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@schemas';
import { getErrorMessage } from '@utils';

import {
    DESIGNATIONS,
    INITIAL_FORM_DATA,
    SIGNUP_COMPLETE,
} from './SignupComplete.config';
import { SignupFormValues } from './SignupComplete.types';

export const SignupCompleteContainer = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const [signup, { isLoading: isRegistering, error: registerError }] =
        useSignupMutation();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: INITIAL_FORM_DATA,
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        if (token && email) {
            const submitData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email,
                token,
                date_of_birth: data.dateOfBirth || null,
                phone: data.phone || null,
                designation: data.designation,
                jiraID: data.jiraId,
                jira_access_token: data.jiraAccessToken,
                password: data.password,
                confirm_password: data.confirmPassword,
            };

            const response = await signup(submitData);
            if ('data' in response) {
                dispatch(setCredentials(response.data));
                navigate(PRIVATE_PATHS.DASHBOARD);
            }
        }
    };

    return (
        <FormBackground>
            <FormComponent
                title={SIGNUP_COMPLETE.TITLE}
                buttonText={
                    isRegistering
                        ? SIGNUP_COMPLETE.STATUS.REGISTERING
                        : SIGNUP_COMPLETE.STATUS.IDLE
                }
                onClick={handleSubmit(onSubmit)}
            >
                <Stack spacing={3} width="100%">
                    {registerError ? (
                        <Alert severity="error">
                            {getErrorMessage(registerError) ||
                                SIGNUP_COMPLETE.MESSAGES.DEFAULT_ERROR}
                        </Alert>
                    ) : null}

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            required
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            autoComplete="given-name"
                            {...register('firstName')}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            fullWidth
                            required
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            autoComplete="family-name"
                            {...register('lastName')}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            id="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            slotProps={{ inputLabel: { shrink: true } }}
                            {...register('dateOfBirth')}
                            error={Boolean(errors.dateOfBirth)}
                            helperText={errors.dateOfBirth?.message}
                        />
                        <TextField
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            variant="outlined"
                            autoComplete="tel"
                            {...register('phone')}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone?.message}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            select
                            required
                            id="designation"
                            label="Designation"
                            variant="outlined"
                            defaultValue={INITIAL_FORM_DATA.designation}
                            {...register('designation')}
                            error={Boolean(errors.designation)}
                            helperText={errors.designation?.message}
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
                            required
                            id="jiraId"
                            label="Jira ID"
                            type="text"
                            variant="outlined"
                            {...register('jiraId')}
                            error={Boolean(errors.jiraId)}
                            helperText={errors.jiraId?.message}
                        />
                        <TextField
                            fullWidth
                            required
                            id="jiraAccessToken"
                            label="Jira Access Token"
                            type="text"
                            variant="outlined"
                            {...register('jiraAccessToken')}
                            error={Boolean(errors.jiraAccessToken)}
                            helperText={errors.jiraAccessToken?.message}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            autoComplete="new-password"
                            {...register('password')}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                edge="end"
                                                aria-label={
                                                    showPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            id="confirmPassword"
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            autoComplete="new-password"
                            {...register('confirmPassword')}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword,
                                                    )
                                                }
                                                edge="end"
                                                aria-label={
                                                    showConfirmPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Stack>
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
