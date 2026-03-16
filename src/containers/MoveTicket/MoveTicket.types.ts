export interface MoveTicketValues {
    projectId: string;
}

export interface MoveTicketFormProps {
    open: boolean;
    onClose: () => void;
    onMove: (newProjectId: string) => Promise<void>;
    isLoading: boolean;
    currentProjectName?: string;
}
