import { PopoverProps } from './Popover.props';
import { StyledPopover } from './Popover.style';

/**
 * A component that provides a reusable Popover component.
 *
 * @param anchorEl - position of the element for Popover
 * @param handleClose - function that defines how closing of popover is handled.
 * @param PopoverContent - Custom Component that you wanna display inside the Popover.
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
