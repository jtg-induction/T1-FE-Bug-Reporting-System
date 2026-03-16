import { ProjectListResponse, UserData } from 'types/common';

export interface ProjectDetailProps {
    isActive: boolean;
    isAdmin: boolean;
    isOwner: boolean;
    projectData: ProjectListResponse | null;
    currentUserData: UserData | null | undefined;
}

export interface ProjectUpdateFormData {
    title: string;
    description: string;
    status: number;
}

export interface EditDialogContentProps {
    formData: ProjectUpdateFormData;
    handleChange: (
        field: keyof ProjectUpdateFormData,
        value: string | number,
    ) => void;
}

export interface EditDialogActionsProps {
    isUpdating: boolean;
    onCancel: () => void;
    onSave: () => void;
    saveText?: string;
    disabled?: boolean;
}
