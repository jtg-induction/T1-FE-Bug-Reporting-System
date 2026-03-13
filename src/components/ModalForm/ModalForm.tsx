import { Button, Dialog } from '@mui/material';

import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './ModalForm.styles';
import { ModalFormProps } from './ModalForm.types';

export const ModalForm = ({
    open,
    title,
    formId,
    onClose,
    isLoading,
    children,
    submitLabel = 'Submit',
}: ModalFormProps) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <StyledDialogTitle>{title}</StyledDialogTitle>

        <StyledDialogContent>{children}</StyledDialogContent>

        <StyledDialogActions>
            <Button onClick={onClose} color="inherit" variant="outlined">
                Cancel
            </Button>
            <Button
                type="submit"
                form={formId}
                variant="contained"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : submitLabel}
            </Button>
        </StyledDialogActions>
    </Dialog>
);
