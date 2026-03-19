import { StyledPopover } from './Popover.styles';
import { PopoverProps } from './Popover.types';

/**
 * Reusable Popover component for displaying contextual content.
 * @param anchorEl - The DOM element used to set the position of the popover.
 * @param handleClose - Callback function fired when the popover requests to close.
 * @param PopoverContent - The React element or component to be rendered inside.
 */
export const Popover = ({
    anchorEl,
    handleClose,
    PopoverContent,
}: PopoverProps) => {
    const open = Boolean(anchorEl);

    return (
        <StyledPopover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            disableScrollLock
        >
            {PopoverContent}
        </StyledPopover>
    );
};
