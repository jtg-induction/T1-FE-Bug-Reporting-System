import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import { StyledButton, StyledFormComponent } from './Form.styles';
import { FormComponentProps } from './Form.types';

export const FormComponent = ({
    title,
    children,
    buttonText,
    redirectText,
    redirectPath,
    onClick,
}: FormComponentProps) => (
    <StyledFormComponent
        component="form"
        onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            void onClick?.();
        }}
    >
        <Typography variant="h2" noWrap>
            {title}
        </Typography>
        {children}
        <StyledButton type="submit">{buttonText}</StyledButton>
        {redirectText && redirectPath && (
            <Link to={redirectPath}>{redirectText}</Link>
        )}
    </StyledFormComponent>
);
