/**
 * Formats a Date object into a 'YYYY-MM-DD' string required by native HTML date inputs.
 * @param date - The Date object to format
 */
export const formatDateForInput = (date: Date): string =>
    date.toISOString().split('T')[0];
