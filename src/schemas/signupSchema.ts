import z from 'zod';

import { VALIDATION_REGEX } from '@constant';

export const signupSchema = z
    .object({
        firstName: z.string().min(2, 'First name cannot be a single character'),
        lastName: z.string().min(2, 'Last name cannot be a single character'),
        dateOfBirth: z.string().optional(),
        phone: z
            .string()
            .optional()
            .refine(
                (val) => !val || val === '' || VALIDATION_REGEX.PHONE.test(val),
                { message: 'Enter a valid phone number' },
            ),
        designation: z.string().min(1, 'Designation is required'),
        jiraId: z.string().min(1, 'Jira ID is required'),
        jiraAccessToken: z.string().min(1, 'Jira Access Token is required'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
