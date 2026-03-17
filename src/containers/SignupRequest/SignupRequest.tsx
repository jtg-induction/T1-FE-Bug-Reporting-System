import { SubmitHandler, useForm } from 'react-hook-form';
import { useGenerateEmailLinkMutation } from 'redux/apiSlice';

import { Alert, Stack, TextField, Typography } from '@mui/material';

import { FormBackground, FormComponent } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupRequestSchema } from '@schemas';
import { getErrorMessage } from '@utils';

import { SIGNUP_CONFIG } from './SignupRequest.config';
import {
    SpamWarningText,
    SuccessContainer,
    SuccessIcon,
} from './SignupRequest.styles';
import { SignupRequestFormValues } from './SignupRequest.types';

export const SignupRequestContainer = () => {
    const [sendVerifyLink, { isLoading, isSuccess, error: apiError }] =
        useGenerateEmailLinkMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupRequestFormValues>({
        resolver: zodResolver(signupRequestSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<SignupRequestFormValues> = async (data) => {
        await sendVerifyLink({ email: data.email });
    };

    if (isSuccess) {
        return (
            <SuccessContainer>
                <SuccessIcon />

                <Typography variant="h4" gutterBottom>
                    {SIGNUP_CONFIG.COPY.SUCCESS_TITLE}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {SIGNUP_CONFIG.COPY.SUCCESS_BODY}
                </Typography>

                <SpamWarningText variant="body2">
                    {SIGNUP_CONFIG.COPY.SPAM_WARNING}
                </SpamWarningText>
            </SuccessContainer>
        );
    }

    return (
        <FormBackground>
            <FormComponent
                title={SIGNUP_CONFIG.TITLE}
                buttonText={
                    isLoading
                        ? SIGNUP_CONFIG.STATUS.LOADING
                        : SIGNUP_CONFIG.STATUS.IDLE
                }
                redirect={{
                    text: SIGNUP_CONFIG.REDIRECT_TEXT,
                    path: SIGNUP_CONFIG.REDIRECT_PATH,
                }}
                onClick={handleSubmit(onSubmit)}
            >
                <Stack spacing={3} width="100%">
                    {apiError ? (
                        <Alert severity="error">
                            {getErrorMessage(apiError) ||
                                SIGNUP_CONFIG.COPY.ERROR_DEFAULT}
                        </Alert>
                    ) : null}

                    <TextField
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        autoComplete="email"
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                </Stack>
            </FormComponent>
        </FormBackground>
    );
};
