import { formatDateForInput } from './formatDateForInput';

/**
 * Returns the start date of the current week (Monday) in 'YYYY-MM-DD' format.
 */
export const getStartOfCurrentWeek = (): string => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(today.setDate(diff));
    return formatDateForInput(startOfWeek);
};
