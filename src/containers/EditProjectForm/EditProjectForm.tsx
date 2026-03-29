import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { ProjectUpdateFormData, projectUpdateSchema } from '@containers';
import { zodResolver } from '@hookform/resolvers/zod';

import { EDIT_PROJECT_FORM_CONFIG } from './EditProjectForm.config';
import { EditProjectFormContainerProps } from './EditProjectForm.types';

export const EditProjectFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    initialData,
}: EditProjectFormContainerProps) => {
    const { control, handleSubmit, reset } = useForm<ProjectUpdateFormData>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues: initialData,
    });
    useEffect(() => {
        if (open) {
            reset(initialData);
        }
    }, [open, initialData, reset]);

    const handleFormSubmit = async (data: ProjectUpdateFormData) => {
        await onSubmit(data);
    };

    return (
        <ModalForm
            open={open}
            title={EDIT_PROJECT_FORM_CONFIG.TITLE}
            formId={EDIT_PROJECT_FORM_CONFIG.ID}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel={EDIT_PROJECT_FORM_CONFIG.SUBMIT_LABEL}
        >
            <form
                id={EDIT_PROJECT_FORM_CONFIG.ID}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Stack spacing={3}>
                    <FormField
                        name="title"
                        label="Title *"
                        control={control}
                        editStatus={true}
                    />
                    <FormField
                        name="description"
                        label="Description *"
                        control={control}
                        editStatus={true}
                        multiline
                        rows={3}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
