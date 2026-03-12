/**
 * A centralized utility to extract user-friendly error messages from RTK Query
 * or Fetch error objects.
 * * @param {unknown} error - The error object returned from a mutation or query.
 * @param {string} [fallback="An unexpected error occurred"] - The message to return if no specific message is found.
 * @returns {string} The extracted error message.
 */
export const getErrorMessage = (
    error: unknown,
    fallback: string = 'An unexpected error occurred',
): string => {
    if (
        error &&
        typeof error === 'object' &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'message' in error.data
    ) {
        return String((error.data as { message: unknown }).message);
    }

    return fallback;
};
