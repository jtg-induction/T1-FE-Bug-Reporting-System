/**
 * Formats a timestamp into a clean, human-readable date and time.
 * @param timestamp - The date string, number, or Date object
 * @param includeTime - Whether to include hours and minutes (default: true)
 */
export const formatDateTime = (
    timestamp: string | number | Date | undefined,
    includeTime: boolean = true
): string => {
    if (!timestamp) return 'N/A';

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...(includeTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    }).format(date);
};