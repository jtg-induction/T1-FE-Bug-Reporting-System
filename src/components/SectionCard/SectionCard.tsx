import { CardHeader } from '@mui/material';

import { StyledCardContent, StyledSectionCard } from './SectionCard.styles';
import { SectionCardProps } from './SectionCard.types';

export const SectionCard = ({
    titleContent,
    subheaderContent,
    mainContent,
}: SectionCardProps) => (
    <StyledSectionCard>
        <CardHeader
            sx={(theme) => ({ ...theme.mixins.lineClamp(2) })}
            title={titleContent}
            subheader={subheaderContent}
        />
        <StyledCardContent>{mainContent}</StyledCardContent>
    </StyledSectionCard>
);
