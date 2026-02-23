import { useEffect, useState } from 'react';

import { useLogin } from 'apiService/requests';
import { useNavigate } from 'react-router-dom';

import { Alert, Stack } from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { EmailTextField, PasswordTextField, validateEmail } from '@containers';
import { useAuth } from '@context/useAuth';

import { LOGIN_PAGE_CONFIG } from './Login.config';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const { loginUser, isLoading, data, error: apiError } = useLogin();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.access) {
            login(data.access);
            navigate('/');
        }
    }, [data, login, navigate]);

    const handleSubmit = () => {
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
        loginUser(email, password);
    };

    const displayError =
        localError ||
        (apiError instanceof Error ? apiError.message : (apiError as string));

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
