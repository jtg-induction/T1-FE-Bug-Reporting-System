/**
 * A centralized utility to extract user-friendly error messages from RTK Query
 * or Fetch error objects.
 * * @param {RTKError} error - The error object returned from a mutation or query.
 * @param {string} [fallback="An unexpected error occurred"] - The message to return if no specific message is found.
 * @returns {string} The extracted error message.
 */

interface RtkError {
    data?: {
        message?: string;
    };
    message?: string;
}

export const getErrorMessage = (
    error: RtkError,
    fallback: string = 'An unexpected error occurred',
): string => {
    const message = error?.data?.message || error?.message;

    return message ? String(message) : fallback;
};
