export interface ModalFormProps {
    open: boolean;
    title: React.ReactNode;
    formId: string;
    onClose: () => void;
    isLoading: boolean;
    children: React.ReactNode;
    submitLabel?: string;
}
