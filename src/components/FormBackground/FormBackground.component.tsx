import { ReactNode } from 'react';

import backgroundImage from 'assets/images/background.webp';

import { Stack } from '@mui/material';

interface FormBackgroundProps {
    children: ReactNode;
}

export const FormBackground = ({ children }: FormBackgroundProps) => (
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
