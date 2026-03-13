import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { PopoverContent } from '@components';
import { PRIVATE_PATHS } from '@constant';

import { UserMenuProps } from './UserMenu.types';

export const UserMenu = ({
    user,
    handleClose,
    handleLogout,
}: UserMenuProps) => {
    const navigate = useNavigate();
    const handleProfileClick = () => {
        handleClose();
        navigate(`${PRIVATE_PATHS.PROFILE}/${user.id}`);
    };

    return (
        <PopoverContent
            title={`${user.first_name} ${user.last_name}`}
            subtitle={user.email}
            actions={
                <>
                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        onClick={handleProfileClick}
                    >
                        View Profile
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() => void handleLogout()}
                    >
                        Logout
                    </Button>
                </>
            }
        />
    );
};
