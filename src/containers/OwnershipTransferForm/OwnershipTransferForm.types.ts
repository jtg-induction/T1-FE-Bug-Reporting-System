export interface TransferOwnershipFormContainerProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { newOwnerId: string }) => Promise<void>;
    isLoading: boolean;
    projectMemberOptions: { LABEL: string; VALUE: string | number }[];
}
