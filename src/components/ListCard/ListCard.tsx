import { ArrowForward } from '@mui/icons-material';

import {
    ActionWrapper,
    ContentWrapper,
    InfoWrapper,
    StyledListItem,
    SubInfoText,
    TextGroup,
    TitleText,
} from './ListCard.styles';
import { ListCardProps } from './ListCard.types';
export const ListCard = ({
    title,
    subtitle,
    Info,
    handleOnClick,
}: ListCardProps) => (
    <StyledListItem disablePadding>
        <ContentWrapper>
            <TextGroup>
                <TitleText variant="h6" noWrap>
                    {title}
                </TitleText>
                <SubInfoText variant="caption">{subtitle}</SubInfoText>
            </TextGroup>

            <InfoWrapper>{Info}</InfoWrapper>

            <ActionWrapper onClick={handleOnClick}>
                <ArrowForward />
            </ActionWrapper>
        </ContentWrapper>
    </StyledListItem>
);
