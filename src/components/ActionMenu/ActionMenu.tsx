import React, { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';

import { ActionMenuProps } from './ActionMenu.types';

export const ActionMenu = ({
    items,
    tooltipTitle = 'More options',
    ariaLabel = 'options menu',
}: ActionMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const visibleItems = items?.filter((item) => item.display !== false) || [];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (onClick?: () => void) => {
        handleClose();
        onClick?.();
    };

    if (visibleItems.length === 0) return null;

    return (
        <>
            <Tooltip title={tooltipTitle}>
                <IconButton
                    aria-label={ariaLabel}
                    aria-controls={open ? 'action-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    size="small"
                >
                    <MoreVert />
                </IconButton>
            </Tooltip>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: { minWidth: 180 },
                    },
                }}
            >
                {visibleItems.map((item) => {
                    if (item.isDivider) {
                        return <Divider key={item.id} />;
                    }

                    return (
                        <MenuItem
                            key={item.id}
                            onClick={() => handleItemClick(item.onClick)}
                            disabled={item.disabled}
                            sx={{ color: item.textColor || 'inherit' }}
                        >
                            {item.icon && (
                                <ListItemIcon
                                    sx={{
                                        color:
                                            item.iconColor ||
                                            item.textColor ||
                                            'inherit',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText>{item.label}</ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};
