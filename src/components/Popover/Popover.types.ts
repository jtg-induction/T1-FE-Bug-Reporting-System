import { UserData } from 'types/common';

export interface PopoverContentProps {
    user: UserData;
    handleClose: () => void;
    handleLogout: () => Promise<void>;
}

export interface PopoverProps {
    anchorEl: HTMLButtonElement | null;
    PopoverContent: React.ReactNode;
    handleClose: () => void;
}
