import { formatDateForInput } from './formatDateForInput';
import { getStartOfCurrentWeek } from './getStartOfWeek';

/**
 * Returns the end date of the current week (Sunday) in 'YYYY-MM-DD' format.
 */
export const getEndOfCurrentWeek = (): string => {
    const startOfWeek = new Date(getStartOfCurrentWeek());
    const endOfWeek = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
    return formatDateForInput(endOfWeek);
};
