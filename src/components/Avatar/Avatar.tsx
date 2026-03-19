import { Tooltip } from '@mui/material';

import { StyledAvatar } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';

/**
 * Custom styled Avatar with optional tooltip and click functionality.
 * * @param name - Alt text for the avatar image.
 * @param src - Image source URL.
 * @param handleClick - Click event handler.
 * @param toolTipContent - Content to display inside the tooltip. (Tooltip rendered only when this prop provided.)
 * @param tooltipPosition - Placement of the tooltip relative to the avatar.
 */
export const Avatar = ({
    name,
    src,
    handleClick,
    toolTipContent,
    tooltipPosition = 'bottom',
}: AvatarProps) => (
    <Tooltip title={toolTipContent} placement={tooltipPosition}>
        <StyledAvatar onClick={handleClick} alt={name} src={src} />
    </Tooltip>
);
