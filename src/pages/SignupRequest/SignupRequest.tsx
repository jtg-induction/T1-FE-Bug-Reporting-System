import { useState } from 'react';

import { useSignupInvite } from 'apiService/requests';

import { Alert, Stack, Typography } from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { EmailTextField, validateEmail } from '@containers';

import { SIGNUP_CONFIG } from './SignupRequest.config';
import {
    SpamWarningText,
    SuccessContainer,
    SuccessIcon,
} from './SignupRequest.styles';

export const SignupRequestPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const { sendInvite, isLoading, data, error } = useSignupInvite();

    const isSent = Boolean(data && !error);

    const handleSendInvite = (e?: React.MouseEvent<HTMLElement>): void => {
        if (e) {
            e.preventDefault();
        }

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }

        void sendInvite(email);
    };

    if (isSent) {
        return (
            <SuccessContainer>
                <SuccessIcon />

                <Typography variant="h4" gutterBottom>
                    {SIGNUP_CONFIG.copy.successTitle}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {SIGNUP_CONFIG.copy.successBody}
                </Typography>

                <SpamWarningText variant="body2">
                    {SIGNUP_CONFIG.copy.spamWarning}
                </SpamWarningText>
            </SuccessContainer>
        );
    }

    return (
        <FormBackground>
            <FormComponent
                title={SIGNUP_CONFIG.title}
                buttonText={
                    isLoading
                        ? SIGNUP_CONFIG.status.loading
                        : SIGNUP_CONFIG.status.idle
                }
                redirectText={SIGNUP_CONFIG.redirectText}
                redirectPath={SIGNUP_CONFIG.redirectPath}
                onClick={handleSendInvite}
            >
                <Stack spacing={3} width="100%">
                    {error ? (
                        <Alert severity="error">
                            {typeof error === 'string'
                                ? error
                                : SIGNUP_CONFIG.copy.errorDefault}
                        </Alert>
                    ) : null}

                    <EmailTextField
                        value={email}
                        onChange={setEmail}
                        error={emailError}
                        setError={setEmailError}
                    />
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
