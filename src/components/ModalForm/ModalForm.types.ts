export interface ModalFormProps {
    open: boolean;
    title: string;
    formId: string;
    onClose: () => void;
    isLoading: boolean;
    children: React.ReactNode;
    submitLabel?: string;
    infoTooltipText?: string;
    infoLink?: string;
}
