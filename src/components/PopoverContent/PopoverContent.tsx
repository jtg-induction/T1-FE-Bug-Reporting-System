import { Divider, Stack, Typography } from '@mui/material';

import { PopoverContentProps } from './PopoverContent.types';

export const PopoverContent = ({
    title,
    subtitle,
    actions,
    children,
}: PopoverContentProps) => (
    <Stack minWidth={240}>
        {(title || subtitle) && (
            <Stack mb={2}>
                {title && (
                    <Typography fontWeight={600} variant="subtitle1">
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography color="text.secondary" variant="body2">
                        {subtitle}
                    </Typography>
                )}
            </Stack>
        )}

        {children}

        {actions && (
            <>
                <Divider />
                <Stack mt={2} gap={2}>
                    {actions}
                </Stack>
            </>
        )}
    </Stack>
);
