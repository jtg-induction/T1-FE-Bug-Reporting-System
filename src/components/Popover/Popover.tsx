import { StyledPopover } from './Popover.style';
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
    // --- 1. STATE ---

    // --- 2. HOOKS ---

    // --- 3. FUNCTIONS / LOGIC ---
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
