import { ReactNode } from 'react';

/**
 * Props for the FormComponent.
 * @typedef {Object} FormComponentProps
 * @property {string} title - The main heading displayed at the top of the form.
 * @property {import('react').ReactNode} children - The form fields or custom content to be rendered inside the layout.
 * @property {string} buttonText - The label for the action button.
 * @property {() => Promise<void>} onClick - Async event handler for the button.
 * @property {{ text: string; path: string }} [redirect] - Optional object containing both redirect text and path.
 */
export interface FormComponentProps {
    title: string;
    children: ReactNode;
    buttonText: string;
    onClick: () => Promise<void>;
    redirect?: {
        text: string;
        path: string;
    };
}
