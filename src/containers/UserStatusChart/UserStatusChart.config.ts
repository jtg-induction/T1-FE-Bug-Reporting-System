export const TICKET_STATUS_MAP: Record<
    number,
    { name: string; color: string }
> = {
    1: { name: 'Open', color: '#9e9e9e' },
    2: { name: 'In Progress', color: '#2196f3' },
    3: { name: 'Resolved', color: '#afa04c' },
    4: { name: 'Closed', color: '#4caf50' },
};
