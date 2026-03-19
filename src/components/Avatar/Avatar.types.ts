import React, { JSX } from 'react';

export interface AvatarTooltipContentProps {
    email: string;
}

export interface AvatarProps {
    name: string;
    src?: string;
    handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    toolTipContent?: JSX.Element | string;
    tooltipPosition?: 'bottom';
}
