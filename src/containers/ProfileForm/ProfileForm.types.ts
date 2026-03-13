import { profileSchema } from 'schemas';
import { UserData } from 'types/common';
import { z } from 'zod';

export type ProfileFormValues = z.infer<typeof profileSchema>;

export interface FormProps {
    displayEmail: string;
    isEditable: boolean;
    userId: string;
    activeUser: UserData;
}
