import { Box, Toolbar, Typography } from '@mui/material';

import { BASIC_PAGE_DATA } from './BasicPage.config';
import { ImageWrapper, StyledBox, StyledButton } from './BasicPage.style';
import { type BasicPageProps, ScannerAction } from './BasicPage.types';

/**
 * A reusable page layout for displaying status-based information.
 * Maps the 'type' prop to configuration data for images and text.
 * * @param handleButton - Function to execute on primary button click.
 * @param type - The specific page state from ScannerAction.
 */
export const BasicPage = ({ handleButton, type }: BasicPageProps) => {

    // --- 1. STATE ---

    // --- 2. HOOKS ---

    // --- 3. FUNCTIONS / LOGIC ---
    const TYPE = ScannerAction[type];
    const pageContent = BASIC_PAGE_DATA[TYPE];

    return (
        <StyledBox>
            <Toolbar />
            
            <ImageWrapper>
                <Box
                    component="img"
                    src={pageContent.src}
                    alt={pageContent.alt}
                />
            </ImageWrapper>

            <Box>
                <Typography variant="h1" textAlign="center">
                    {pageContent.text}
                </Typography>
                <Typography
                    variant="h3"
                    color="text.secondary"
                    textAlign="center"
                >
                    {pageContent.subtext}
                </Typography>
            </Box>

            <StyledButton onClick={handleButton}>
                {pageContent.buttonText}
            </StyledButton>
        </StyledBox>
    );
};