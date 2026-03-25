import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCredentials } from 'redux/features/authSlice';
import { useAppDispatch } from 'redux/store';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@schemas';
import { useLoginMutation } from '@service';
import { getErrorMessage } from '@utils';

import { LOGIN_PAGE_CONFIG } from './Login.config';
import { LoginFormValues } from './Login.types';

export const LoginContainer = () => {
    const [login, { isLoading, error: apiError }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        const result = await login({
            email: data.email,
            password: data.password,
        }).unwrap();

        if (result.success && result.data) {
            dispatch(setCredentials(result.data));
            const continueUrl =
                searchParams.get('continue') || PRIVATE_PATHS.DASHBOARD;

            navigate(continueUrl, { replace: true });
        }
    };

    const displayError = apiError ? getErrorMessage(apiError) : null;

    return (
        <FormBackground>
            <FormComponent
                title={LOGIN_PAGE_CONFIG.TITLE}
                buttonText={
                    isLoading
                        ? LOGIN_PAGE_CONFIG.STATUS.LOADING
                        : LOGIN_PAGE_CONFIG.STATUS.IDLE
                }
                redirect={{
                    text: LOGIN_PAGE_CONFIG.REDIRECT_TEXT,
                    path: LOGIN_PAGE_CONFIG.REDIRECT_PATH,
                }}
                onClick={handleSubmit(onSubmit)}
            >
                <Stack spacing={3} width="100%">
                    {displayError ? (
                        <Alert severity="error">{displayError}</Alert>
                    ) : null}

                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        {...register('password')}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
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
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
