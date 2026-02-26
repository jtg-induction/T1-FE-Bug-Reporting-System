import { ReactNode } from 'react';

export type FormComponentProps =
    | (FormComponentPropsBase & { redirectText: string; redirectPath: string })
    | (FormComponentPropsBase & { redirectText?: never; redirectPath?: never });

interface FormComponentPropsBase {
    title: string;
    children: ReactNode;
    buttonText: string;
    onClick: () => Promise<void>;
}
