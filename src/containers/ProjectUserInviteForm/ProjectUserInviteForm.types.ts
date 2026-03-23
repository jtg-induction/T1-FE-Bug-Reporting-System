export interface ProjectUserInviteFormData {
    user_id: string;
    role: number;
}

export interface ProjectUserInviteFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectUserInviteFormData) => Promise<void>;
    isLoading: boolean;
    errorMessage?: string;
    userOptions: { LABEL: string; VALUE: string | number }[];
    roleOptions: { LABEL: string; VALUE: string | number }[];
}
