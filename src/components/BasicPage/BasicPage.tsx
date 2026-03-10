import { Box, Toolbar, Typography } from '@mui/material';

import { BASIC_PAGE_DATA } from './BasicPage.config';
import { ImageWrapper, StyledBox, StyledButton } from './BasicPage.style';
import { type BasicPageProps, ScannerAction } from './BasicPage.types';

export const BasicPage = ({ handleButton, type }: BasicPageProps) => {
    const TYPE = ScannerAction[type];
    return (
        <StyledBox>
            <Toolbar />
            <ImageWrapper>
                <Box
                    component="img"
                    src={BASIC_PAGE_DATA[TYPE].src}
                    alt={BASIC_PAGE_DATA[TYPE].alt}
                />
            </ImageWrapper>
            <Box>
                <Typography variant="h1" textAlign="center">
                    {BASIC_PAGE_DATA[TYPE].text}
                </Typography>
                <Typography
                    variant="h3"
                    color="text.secondary"
                    textAlign="center"
                >
                    {BASIC_PAGE_DATA[TYPE].subtext}
                </Typography>
            </Box>
            <StyledButton onClick={handleButton}>
                {BASIC_PAGE_DATA[TYPE].buttonText}
            </StyledButton>
        </StyledBox>
    );
};
