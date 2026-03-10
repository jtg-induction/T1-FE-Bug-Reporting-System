import { useNavigate } from 'react-router-dom';

import { BasicPage } from '@components';

export const ErrorPage = () => {
    const navigate = useNavigate();
    const handleButton = () => void navigate('/');

    return <BasicPage type="error" handleButton={handleButton} />;
};
