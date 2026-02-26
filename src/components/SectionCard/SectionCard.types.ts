import { SxProps, Theme } from '@mui/material';

export interface SectionCardProps {
    TitleContent: React.ReactNode;
    SubheaderContent?: React.ReactNode;
    MainContent: React.ReactNode;
    sx?: SxProps<Theme> | undefined;
}
