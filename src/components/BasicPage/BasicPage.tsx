import { Box, Toolbar, Typography } from '@mui/material';

import type { BasicPageProps } from './BasicPage.props';
import { ImageWrapper, StyledBox, StyledButton } from './BasicPage.style';

export const BasicPage = ({
    src,
    alt,
    text,
    subtext,
    buttonText,
    handleButton,
}: BasicPageProps) => (
    <StyledBox>
        <Toolbar />
        <ImageWrapper>
            <Box component="img" src={src} alt={alt} />
        </ImageWrapper>
        <Box>
            <Typography variant="h1" textAlign="center">
                {text}
            </Typography>
            <Typography variant="h3" color="text.secondary" textAlign="center">
                {subtext}
            </Typography>
        </Box>
        <StyledButton onClick={handleButton}>{buttonText}</StyledButton>
    </StyledBox>
);
