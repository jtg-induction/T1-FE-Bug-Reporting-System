import { alpha, Box, Stack, styled } from '@mui/material';

export const StyledBoardContainer = styled(Stack)(({ theme: { typography: { pxToRem }, palette } }) => ({
    flexDirection: 'row',
    gap: pxToRem(16),
    height: 'max-content',
    width: '100%',
    overflowX: 'auto',
    padding: pxToRem(12),
    backgroundColor: alpha(palette.primary.main, .1),
    alignItems: 'flex-start',
}));

export const StyledColumnWrapper = styled(Box)(({ theme: { typography: { pxToRem }, palette } }) => ({
    minWidth: pxToRem(300),
    maxHeight: pxToRem(620),
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: pxToRem(12),
    padding: pxToRem(12),
    borderRadius: 16,
    backgroundColor: palette.common.white,
}));

export const StyledColumnHeader = styled(Stack)(({ theme: { palette, typography: { pxToRem } } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${pxToRem(8)} 0`,
    marginBottom: pxToRem(4),
    borderBottom: `1px solid ${palette.divider}`,
}));