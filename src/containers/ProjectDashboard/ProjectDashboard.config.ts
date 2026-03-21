export const DASHBOARD_TEXT = {
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    loading: 'Loading...',
    saving: 'Saving...',
};

export const TAB_VALUES = {
    TICKETS: 0,
    USERS: 1,
    SUMMARY: 2,
} as const;

export const PROJECT_TABS = [
    { label: 'Tickets', value: TAB_VALUES.TICKETS },
    { label: 'Users', value: TAB_VALUES.USERS },
    { label: 'Summary', value: TAB_VALUES.SUMMARY },
];
