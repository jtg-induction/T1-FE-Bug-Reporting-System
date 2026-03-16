/**
 * Returns a human-readable string of days and hours remaining/passed from a timestamp.
 * @param timestamp - The target date (ISO string, Date object, or number)
 */
export const getTimeFromNow = (timestamp: string | number | Date): string => {
    const now = new Date().getTime();
    const target = new Date(timestamp).getTime();
    const diffInMs = Math.abs(target - now);

    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * msInHour;

    const days = Math.floor(diffInMs / msInDay);
    const hours = Math.floor((diffInMs % msInDay) / msInHour);

    const dayText = days === 1 ? 'day' : 'days';
    const hourText = hours === 1 ? 'hour' : 'hours';

    if (days > 0) {
        return `${days} ${dayText}${hours > 0 ? ` ${hours} ${hourText}` : ''}`;
    }
    
    return `${hours} ${hourText}`;
};