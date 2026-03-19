export interface PopoverProps {
    anchorEl: HTMLDivElement | null;
    PopoverContent: React.ReactNode;
    handleClose: () => void;
}
