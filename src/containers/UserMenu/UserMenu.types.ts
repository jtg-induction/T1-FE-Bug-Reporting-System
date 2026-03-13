import { UserData } from 'types/common';

export interface UserMenuProps {
    user: UserData;
    handleClose: () => void;
    handleLogout: () => Promise<void>;
}
