import { useForm } from 'react-hook-form';
import { INITIAL_FORM_DATA, ProjectFormValues, projectSchema } from 'schemas';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { PROJECT_STATUS_OPTIONS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProjectMutation } from '@service';

import { PROJECT_FORM_CONFIG } from './ProjectForm.config';
import { ProjectFormContainerProps } from './ProjectForm.types';

export const ProjectFormContainer = ({
    open,
    onClose,
    onSubmit,
}: ProjectFormContainerProps) => {
    const { control, handleSubmit, reset } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: INITIAL_FORM_DATA,
    });

    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();

    const handleCreateProject = async (formData: ProjectFormValues) => {
        try {
            await createProject(formData).unwrap();
            onSubmit();
            reset();
        } catch {}
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <ModalForm
            open={open}
            title={PROJECT_FORM_CONFIG.TITLE}
            formId={PROJECT_FORM_CONFIG.ID}
            onClose={handleClose}
            isLoading={isCreating}
            submitLabel={PROJECT_FORM_CONFIG.SUBMIT_LABEL}
        >
            <form
                id={PROJECT_FORM_CONFIG.ID}
                onSubmit={(e) => void handleSubmit(handleCreateProject)(e)}
            >
                <Stack spacing={3} mt={1}>
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
                    <FormField
                        name="key"
                        label="Project Key *"
                        control={control}
                        editStatus={true}
                    />
                    <FormField
                        name="status"
                        label="Status *"
                        type="select"
                        control={control}
                        editStatus={true}
                        options={PROJECT_STATUS_OPTIONS}
                    />
                    <FormField
                        name="jira_url"
                        label="Jira URL *"
                        control={control}
                        editStatus={true}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
