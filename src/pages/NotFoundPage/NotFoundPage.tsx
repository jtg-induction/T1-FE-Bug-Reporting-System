import { useNavigate } from 'react-router-dom';

import { BasicPage } from '@components';

import { NOT_FOUND_PAGE_DATA } from './NotFoundPage.config';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleButton = () => void navigate('/');

    return (
        <BasicPage
            src={NOT_FOUND_PAGE_DATA.src}
            alt="404 Image"
            text={NOT_FOUND_PAGE_DATA.text}
            subtext={NOT_FOUND_PAGE_DATA.subtext}
            handleButton={handleButton}
            buttonText={NOT_FOUND_PAGE_DATA.buttonText}
        />
    );
};
