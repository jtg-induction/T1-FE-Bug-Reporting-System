import { ProjectUpdateFormData } from '@containers';

export interface EditProjectFormContainerProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectUpdateFormData) => Promise<void>;
    isLoading: boolean;
    initialData: ProjectUpdateFormData;
}
