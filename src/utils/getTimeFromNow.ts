/**
 * Returns a human-readable string (seconds, minutes, hours, days, months, years)
 * @param timestamp - The target date
 */
export const getTimeFromNow = (timestamp: string | number | Date): string => {
    const now = new Date().getTime();
    const target = new Date(timestamp).getTime();
    const diffInMs = Math.abs(target - now);

    const msInSec = 1000;
    const msInMin = 60 * msInSec;
    const msInHour = 60 * msInMin;
    const msInDay = 24 * msInHour;
    const msInMonth = 30 * msInDay;
    const msInYear = 365 * msInDay;

    if (diffInMs >= msInYear) {
        const years = Math.floor(diffInMs / msInYear);
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    if (diffInMs >= msInMonth) {
        const months = Math.floor(diffInMs / msInMonth);
        return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    if (diffInMs >= msInDay) {
        const days = Math.floor(diffInMs / msInDay);
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    if (diffInMs >= msInHour) {
        const hours = Math.floor(diffInMs / msInHour);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (diffInMs >= msInMin) {
        const minutes = Math.floor(diffInMs / msInMin);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    
    const seconds = Math.floor(diffInMs / msInSec);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
};