import { CardContent, CardHeader } from '@mui/material';

import { StyledSectionCard } from './SectionCard.style';
import { SectionCardProps } from './SectionCard.types';

export const SectionCard = ({
    TitleContent,
    SubheaderContent,
    MainContent,
    sx,
}: SectionCardProps) => (
    <StyledSectionCard sx={sx}>
        <CardHeader
            sx={(theme) => ({ ...theme.mixins.lineClamp(2) })}
            title={TitleContent}
            subheader={SubheaderContent}
        />
        <CardContent
            sx={{ height: '100%', '&:last-child': { paddingBottom: 0 } }}
        >
            {MainContent}
        </CardContent>
    </StyledSectionCard>
);
