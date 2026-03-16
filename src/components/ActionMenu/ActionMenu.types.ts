import React from 'react';

export interface ActionMenuItem {
    id: string;
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    textColor?: string;
    iconColor?: string;
    isDivider?: boolean;
}

export interface ActionMenuProps {
    items: ActionMenuItem[];
    tooltipTitle?: string;
    ariaLabel?: string;
}
