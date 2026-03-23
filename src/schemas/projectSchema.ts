import { z } from 'zod';

export const projectSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters'),
    key: z.string().min(2, 'Key must be at least 2 characters'),
    status: z.number(),
    jira_url: z.string().url('Must be a valid URL').or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const INITIAL_FORM_DATA: ProjectFormValues = {
    title: '',
    description: '',
    key: '',
    status: 2,
    jira_url: '',
};
