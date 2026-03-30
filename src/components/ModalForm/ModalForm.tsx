import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Dialog, IconButton, Tooltip } from '@mui/material';

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
    infoTooltipText,
    infoLink,
    showSubmit = true,
}: ModalFormProps) => (
    <Dialog
        sx={{ '& .MuiPaper-root': { borderRadius: 4, padding: 2, gap: 2 } }}
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
    >
        <StyledDialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {title}
                {infoTooltipText && (
                    <Tooltip title={infoTooltipText}>
                        {infoLink ? (
                            <IconButton
                                component="a"
                                href={infoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ color: 'text.secondary', p: 0.5 }}
                            >
                                <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <InfoOutlinedIcon
                                fontSize="small"
                                sx={{ color: 'text.secondary', ml: 0.5 }}
                            />
                        )}
                    </Tooltip>
                )}
            </Box>
        </StyledDialogTitle>

        <StyledDialogContent>{children}</StyledDialogContent>

        <StyledDialogActions>
            <Button
                onClick={onClose}
                color="inherit"
                variant="outlined"
                disabled={isLoading}
            >
                Cancel
            </Button>
            {showSubmit && (
                <Button
                    type="submit"
                    form={formId}
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : submitLabel}
                </Button>
            )}
        </StyledDialogActions>
    </Dialog>
);
