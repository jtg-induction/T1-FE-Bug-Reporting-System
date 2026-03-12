import { Tooltip } from '@mui/material';
import { Avatar as MUIAvatar } from '@mui/material';

import { ConditionalWrapper } from '@components/ConditionalWrapper';

import { AvatarProps } from './Avatar.props';
import { AvatarWrapper } from './Avatar.style';

/**
 * Custom styled Avatar with optional tooltip and click functionality.
 * * @param name - Alt text for the avatar image.
 * @param src - Image source URL.
 * @param handleClick - Click event handler.
 * @param toolTipContent - Content to display inside the tooltip.
 * @param tooltipPosition - Placement of the tooltip relative to the avatar.
 */
export const Avatar = ({
    name,
    src,
    handleClick,
    toolTipContent,
    tooltipPosition = 'bottom',
}: AvatarProps) => (
    <ConditionalWrapper
        condition={Boolean(handleClick)}
        wrapper={(children: React.ReactElement<unknown>) => (
            <AvatarWrapper onClick={handleClick}>{children}</AvatarWrapper>
        )}
    >
        <ConditionalWrapper
            condition={Boolean(toolTipContent)}
            wrapper={(children: React.ReactElement<unknown>) => (
                <Tooltip title={toolTipContent} placement={tooltipPosition}>
                    {children}
                </Tooltip>
            )}
        >
            <MUIAvatar alt={name} src={src} />
        </ConditionalWrapper>
    </ConditionalWrapper>
);