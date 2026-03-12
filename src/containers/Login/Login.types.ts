import * as z from 'zod';

import { loginSchema } from '@schemas';

export type LoginFormValues = z.infer<typeof loginSchema>;
