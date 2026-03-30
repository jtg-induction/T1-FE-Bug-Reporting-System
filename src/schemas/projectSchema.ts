import { z } from 'zod';

export const projectSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters'),
    key: z
        .string()
        .min(2, 'Key must be at least 2 characters')
        .max(50, 'Key cannot exceed 50 characters')
        .regex(
            /^[A-Z][A-Z0-9]+$/,
            'Key must start with an uppercase letter followed by uppercase alphanumeric characters',
        ),
    status: z.number(),
    jira_url: z.string().min(2, 'URL is required').url('Must be a valid URL'),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const INITIAL_FORM_DATA: ProjectFormValues = {
    title: '',
    description: '',
    key: '',
    status: 2,
    jira_url: '',
};
