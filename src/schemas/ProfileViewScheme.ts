import { z } from 'zod';

import { VALIDATION_REGEX } from '@constant';

export const profileSchema = z.object({
    first_name: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .nonempty('First name is required'),
    last_name: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .nonempty('Last name is required'),
    date_of_birth: z.string().optional().or(z.literal('')).nullable(),
    phone: z
        .string()
        .regex(VALIDATION_REGEX.PHONE, 'Enter a valid phone number')
        .nullable()
        .or(z.literal('')),
    designation: z.string().nonempty('Designation is required'),
    jiraID: z.string().optional(),
    jira_access_token: z.string().optional(),
});
