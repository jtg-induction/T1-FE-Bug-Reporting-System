import backgroundImage from 'assets/images/background.webp';

import { Stack, styled } from '@mui/material';

export const StyledBackgroundStack = styled(Stack)({
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
});
