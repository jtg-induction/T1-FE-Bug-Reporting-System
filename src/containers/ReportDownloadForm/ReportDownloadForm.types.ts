export interface DownloadReportFormContainerProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ReportFormValues) => Promise<void>;
    isLoading: boolean;
    userOptions?: { LABEL: string; VALUE: string }[];
    showUserFilter?: boolean;
}

export interface ReportFormValues {
    selectedUserIds?: string[];
    dateRangeType: 'week' | 'custom';
    startDate: string;
    endDate: string;
}
