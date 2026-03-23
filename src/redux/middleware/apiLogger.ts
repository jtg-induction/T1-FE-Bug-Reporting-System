import { showSnackbar } from 'redux/features/profileSlice';

import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const apiLogger: Middleware = (api) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
        const payload = action.payload;
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
                        : `${formattedField}: ${detail}`;
            }
        }

        api.dispatch(
            showSnackbar({
                message: finalMessage,
                severity: 'error',
            }),
        );
    }

    if (isFulfilled(action) && action.meta?.arg?.type === 'mutation') {
        const payload = action.payload;
        if (payload?.message) {
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
