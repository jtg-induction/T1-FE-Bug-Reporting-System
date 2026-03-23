import { ProjectCreateData } from 'types/common';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface DialogContentProps {
    formData: ProjectCreateData;
    errors: Record<string, string>;
    handleChange: (
        field: string,
    ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    createError: FetchBaseQueryError | SerializedError | undefined;
}

export interface DialogActionProps {
    creatingProject: boolean;
    handleCancel: () => void;
    handleCreate: (e?: React.SyntheticEvent) => Promise<void>;
}

export interface TitleContentProps {
    handleFormOpen: () => void;
}

export interface TitleContentExtendedProps extends TitleContentProps {
    title: string;
    showCreate: boolean;
}
