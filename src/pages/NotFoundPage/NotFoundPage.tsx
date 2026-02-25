import { useNavigate } from 'react-router-dom';

import { BasicPage } from '@components';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleButton = () => void navigate('/');

    return <BasicPage type="notFound" handleButton={handleButton} />;
};
