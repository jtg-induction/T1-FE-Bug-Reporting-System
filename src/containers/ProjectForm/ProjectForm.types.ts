import { ProjectFormValues } from '@schemas';

export interface ProjectFormContainerProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormValues) => Promise<void>;
    isLoading: boolean;
}
