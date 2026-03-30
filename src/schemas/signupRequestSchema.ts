import z from 'zod';

export const signupRequestSchema = z.object({
    email: z.email(),
});
