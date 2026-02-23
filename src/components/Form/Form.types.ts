import { MouseEvent, ReactNode } from 'react';

import { StackProps } from '@mui/material';

export interface FormComponentProps extends StackProps {
    title: string;
    children: ReactNode;
    buttonText: string;
    redirectText?: string;
    redirectPath?: string;
    onClick: (event: MouseEvent<HTMLElement>) => void;
}
