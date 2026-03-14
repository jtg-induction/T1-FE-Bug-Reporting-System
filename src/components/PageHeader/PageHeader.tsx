import { Box } from '@mui/material';

import {
    ActionArea,
    HeaderContainer,
    PageSubheader,
    PageTitle,
} from './PageHeader.styles';
import { PageHeaderProps } from './PageHeader.types';

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
    <HeaderContainer>
        <Box>
            <PageTitle variant="h4">{title}</PageTitle>
            {subtitle && <PageSubheader variant="h6">{subtitle}</PageSubheader>}
        </Box>

        {actions && <ActionArea>{actions}</ActionArea>}
    </HeaderContainer>
);
