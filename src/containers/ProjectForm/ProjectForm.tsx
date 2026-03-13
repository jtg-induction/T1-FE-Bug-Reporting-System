import { useForm } from 'react-hook-form';
import { INITIAL_FORM_DATA, ProjectFormValues, projectSchema } from 'schemas';

import { ModalForm } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProjectFields } from './ProjectFields';
import { ProjectFormContainerProps } from './ProjectForm.types';

export const ProjectFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
}: ProjectFormContainerProps) => {
    const formId = 'create-project-form';
    const { control, handleSubmit, reset } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: INITIAL_FORM_DATA,
    });

    const handleFormSubmit = async (data: ProjectFormValues) => {
        await onSubmit(data);
        reset();
    };

    return (
        <ModalForm
            open={open}
            title="Create Project"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel="Create"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <ProjectFields control={control} />
            </form>
        </ModalForm>
    );
};
