export interface DialogProps {
    title: string;
    DialogContentData: React.ReactElement;
    DialogActionsContent: React.ReactElement;
    open: boolean;
    handleClose: () => void;
}
