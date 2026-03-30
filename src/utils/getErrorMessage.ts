/**
 * A centralized utility to extract user-friendly error messages from RTK Query
 * or Fetch error objects.
 *
 * @param {unknown} error - The error object returned from a mutation or query.
 * @param {string} [fallback="An unexpected error occurred"] - The message to return if no specific message is found.
 * @returns {string} The extracted error message.
 */

interface RtkError {
    data?: {
        message?: string;
        errors?: Record<string, string[]>;
    };
    message?: string;
}

export const getErrorMessage = (
    error: unknown,
    fallback: string = 'An unexpected error occurred',
): string => {
    if (!error || typeof error !== 'object') {
        return fallback;
    }

    const rtkError = error as RtkError;

    const fieldErrors = rtkError.data?.errors;

    if (fieldErrors && typeof fieldErrors === 'object') {
        const firstFieldErrorArray = Object.values(fieldErrors)[0];

        if (
            Array.isArray(firstFieldErrorArray) &&
            firstFieldErrorArray.length > 0
        ) {
            return String(firstFieldErrorArray[0]);
        }
    }

    const message = rtkError.data?.message || rtkError.message;

    if (message && message !== 'Error') {
        return String(message);
    }

    return fallback;
};
