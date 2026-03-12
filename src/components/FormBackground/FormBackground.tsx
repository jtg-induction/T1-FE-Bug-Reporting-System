import { PropsWithChildren } from 'react';

import { StyledBackgroundStack } from './FormBackground.styles';

export const FormBackground = ({ children }: PropsWithChildren) => (
    <StyledBackgroundStack>{children}</StyledBackgroundStack>
);
