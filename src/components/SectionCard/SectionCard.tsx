import { CardContent, CardHeader } from '@mui/material';

import { StyledSectionCard } from './SectionCard.styles';
import { SectionCardProps } from './SectionCard.types';

export const SectionCard = ({
    TitleContent,
    SubheaderContent,
    MainContent,
}: SectionCardProps) => (
    <StyledSectionCard>
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
