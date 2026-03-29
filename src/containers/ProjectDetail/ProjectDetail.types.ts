import { ProjectListResponse, UserData } from 'types/common';
import z from 'zod';

export interface ProjectDetailProps {
    isActive: boolean;
    isAdmin: boolean;
    isOwner: boolean;
    projectData: ProjectListResponse | null;
    currentUserData: UserData | null | undefined;
}

export const projectUpdateSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters'),
});

export type ProjectUpdateFormData = z.infer<typeof projectUpdateSchema>;

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
