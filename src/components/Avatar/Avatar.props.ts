import React from 'react';

export interface AvatarTooltipContentProps {
    email: string;
}

export interface AvatarProps {
    name: string;
    src: string;
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    toolTipContent?: React.ReactNode;
    tooltipPosition?: 'bottom';
}
