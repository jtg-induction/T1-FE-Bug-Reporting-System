import { showSnackbar } from 'redux/features/profileSlice';

import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

interface RejectedPayload {
    data?: {
        message?: string;
        errors?: Record<string, string | string[]>;
    };
}
interface FulfilledPayload {
    message?: string;
}

interface ActionMeta {
    arg?: {
        type?: string;
    };
}

export const apiLogger: Middleware = (api) => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
        const payload = (action as { payload?: RejectedPayload }).payload;

        let finalMessage =
            payload?.data?.message || 'An unexpected error occurred';

        if (payload?.data?.errors && typeof payload.data.errors === 'object') {
            const errorEntries = Object.entries(payload.data.errors);
            if (errorEntries.length > 0) {
                const [field, message] = errorEntries[0];
                const detail = Array.isArray(message) ? message[0] : message;

                const formattedField =
                    field.charAt(0).toUpperCase() + field.slice(1);

                finalMessage =
                    typeof detail === 'string' &&
                    detail.toLowerCase().includes(field.toLowerCase())
                        ? detail
                        : `${formattedField}: ${String(detail)}`;
            }
        }

        api.dispatch(
            showSnackbar({
                message: finalMessage,
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

        if (meta?.arg?.type === 'mutation' && payload?.message) {
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
