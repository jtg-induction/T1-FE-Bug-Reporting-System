export interface TicketUpdateFormData {
    title: string;
    description: string;
    status: number;
    severity: number;
    assignee: string;
    deadline: string | undefined;
}

export interface DashboardHeaderProps {
    projectKey: string;
    isAdmin: boolean;
    onEditClick: () => void;
}

export interface EditDialogContentProps {
    formData: TicketUpdateFormData;
    handleChange: (
        field: keyof TicketUpdateFormData,
        value: string | number,
    ) => void;
}

export interface MemberData {
    role: number;
    member: {
        id: string;
        first_name: string;
        last_name: string;
    };
}

export interface EditDialogActionsProps {
    isUpdating: boolean;
    onCancel: () => void;
    onSave: () => void;
    saveText?: string;
    disabled?: boolean;
}
