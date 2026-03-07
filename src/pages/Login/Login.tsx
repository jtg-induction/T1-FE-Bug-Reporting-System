import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'redux/apiSlice';
import { setCredentials } from 'redux/features/authSlice';
import { useAppDispatch } from 'redux/store';

import { Alert, Stack } from '@mui/material';

import {
    EmailTextField,
    FormBackground,
    FormComponent,
    PasswordTextField,
    validateEmail,
} from '@components';
import { privatePaths } from '@constant';
import { getErrorMessage } from '@utils';

import { LOGIN_PAGE_CONFIG } from './Login.config';

export const LoginPage = () => {
    const [login, { isLoading, error: apiError }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLocalError(null);
        setEmailError('');

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }
        if (!password) {
            setLocalError(LOGIN_PAGE_CONFIG.messages.passwordRequired);
            return;
        }

        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials(result));
            navigate(privatePaths.dashboard);
        } catch {
            setLocalError('Login failed. Please try again.');
        }
    };

    const displayError =
        localError || (apiError ? getErrorMessage(apiError) : null);

    return (
        <FormBackground>
            <FormComponent
                title={LOGIN_PAGE_CONFIG.title}
                buttonText={
                    isLoading
                        ? LOGIN_PAGE_CONFIG.status.loading
                        : LOGIN_PAGE_CONFIG.status.idle
                }
                redirectText={LOGIN_PAGE_CONFIG.redirectText}
                redirectPath={LOGIN_PAGE_CONFIG.redirectPath}
                onClick={handleSubmit}
            >
                <Stack spacing={3} width="100%">
                    {displayError ? (
                        <Alert severity="error">{displayError}</Alert>
                    ) : null}

                    <EmailTextField
                        value={email}
                        onChange={setEmail}
                        error={emailError}
                        setError={setEmailError}
                    />
                    <PasswordTextField
                        value={password}
                        onChange={setPassword}
                    />
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
