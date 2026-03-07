import { ReactNode } from 'react';

/**
 * Props for the FormComponent.
 * * This type uses a Discriminated Union to enforce one of two states:
 * 1. **With Redirect**: Requires both `redirectText` and `redirectPath`.
 * 2. **Without Redirect**: Neither `redirectText` nor `redirectPath` can be provided.
 * * @typedef {FormComponentPropsBase & {redirectText: string, redirectPath: string} |
 * FormComponentPropsBase & {redirectText?: never, redirectPath?: never}} FormComponentProps
 */
export type FormComponentProps =
    | (FormComponentPropsBase & { redirectText: string; redirectPath: string })
    | (FormComponentPropsBase & { redirectText?: never; redirectPath?: never });

/**
 * @typedef {Object} FormComponentPropsBase
 * @property {string} title - The main heading displayed at the top of the form.
 * @property {import('react').ReactNode} children - The form fields or custom content to be rendered inside the layout.
 * @property {string} buttonText - The label for the action button.
 * @property {() => Promise<void>} onClick - Async event handler for the  button.
 */
interface FormComponentPropsBase {
    title: string;
    children: ReactNode;
    buttonText: string;
    onClick: () => Promise<void>;
}
