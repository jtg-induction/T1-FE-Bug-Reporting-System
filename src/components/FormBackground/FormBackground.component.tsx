import { PropsWithChildren } from 'react';

import backgroundImage from 'assets/images/background.webp';

import { Stack } from '@mui/material';

export const FormBackground = ({ children }: PropsWithChildren) => (
    <Stack
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
    >
        {children}
    </Stack>
);
