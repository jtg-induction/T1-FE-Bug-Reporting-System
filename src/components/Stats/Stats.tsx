import {
    IconWrapper,
    StatsContainer,
    SubtitleText,
    TextContainer,
    TitleText,
} from './Stats.styles';
import { StatsProps } from './Stats.types';

export const Stats = ({ icon, title, subtitle }: StatsProps) => (
    <StatsContainer>
        <IconWrapper>{icon}</IconWrapper>

        <TextContainer>
            <TitleText variant="body1">{title}</TitleText>
            <SubtitleText variant="body2">{subtitle}</SubtitleText>
        </TextContainer>
    </StatsContainer>
);
