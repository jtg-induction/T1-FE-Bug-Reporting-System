import { showSnackbar } from 'redux/features/profileSlice';

import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

interface ErrorData {
    error?: unknown;
    detail?: unknown;
    message?: unknown;
    errors?: Record<string, unknown>;
}

interface RejectedPayload {
    data?: ErrorData;
    error?: unknown;
    detail?: unknown;
    message?: unknown;
    errors?: Record<string, unknown>;
}

interface FulfilledPayload {
    message?: string;
}

interface ActionMeta {
    arg?: {
        type?: string;
        endpointName?: string;
    };
}

const IGNORED_ENDPOINTS = ['acceptInvite', 'rejectInvite'];

export const apiLogger: Middleware = (api) => (next) => (action: unknown) => {
    const actionWithMeta = action as { meta?: ActionMeta };
    const endpointName = actionWithMeta?.meta?.arg?.endpointName;

    if (endpointName && IGNORED_ENDPOINTS.includes(endpointName)) {
        return next(action);
    }

    if (isRejectedWithValue(action)) {
        const rejectedAction = action as { payload?: RejectedPayload };
        const payload = rejectedAction.payload;

        const responseData = payload?.data || payload;

        let finalMessage = 'An unexpected error occurred. Please try again.';

        if (responseData && typeof responseData === 'object') {
            const errorsObj = responseData.errors;

            if (
                errorsObj &&
                typeof errorsObj === 'object' &&
                typeof errorsObj.error === 'string'
            ) {
                finalMessage = errorsObj.error;
            } else if (typeof responseData.error === 'string') {
                finalMessage = responseData.error;
            } else if (typeof responseData.detail === 'string') {
                finalMessage = responseData.detail;
            } else if (
                typeof responseData.message === 'string' &&
                responseData.message !== 'Error'
            ) {
                finalMessage = responseData.message;
            } else {
                const errorFields =
                    errorsObj && typeof errorsObj === 'object'
                        ? errorsObj
                        : (responseData as Record<string, unknown>);

                const errorEntries = Object.entries(errorFields).filter(
                    ([key]) => key !== 'jira_details',
                );

                if (errorEntries.length > 0) {
                    const [field, message] = errorEntries[0];
                    const detail = Array.isArray(message)
                        ? (message as unknown[])[0]
                        : message;

                    if (typeof detail === 'string') {
                        if (
                            field === 'non_field_errors' ||
                            field === 'errorMessages'
                        ) {
                            finalMessage = detail;
                        } else {
                            const formattedField =
                                field.charAt(0).toUpperCase() +
                                field.slice(1).replace(/_/g, ' ');
                            finalMessage = detail
                                .toLowerCase()
                                .includes(field.toLowerCase())
                                ? detail
                                : `${formattedField}: ${detail}`;
                        }
                    }
                }
            }
        }

        const formattedMessage = finalMessage.replace(/ \| /g, '\n');

        api.dispatch(
            showSnackbar({
                message: formattedMessage,
                severity: 'error',
            }),
        );
    }

    if (isFulfilled(action)) {
        const fulfilledAction = action as {
            payload?: FulfilledPayload;
            meta?: ActionMeta;
        };
        const payload = fulfilledAction.payload;
        const meta = fulfilledAction.meta;

        if (
            meta?.arg?.type === 'mutation' &&
            typeof payload?.message === 'string'
        ) {
            api.dispatch(
                showSnackbar({
                    message: payload.message,
                    severity: 'success',
                }),
            );
        }
    }

    return next(action);
};
