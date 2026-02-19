import { useNavigate } from 'react-router-dom';

import { BasicPage } from '@components';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleButton = () => void navigate('/');

    return (
        <>
            <BasicPage
                src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="404 Image"
                text={text}
                subtext={subtext}
                handleButton={handleButton}
                buttonText={buttonText}
            />
        </>
    );
};

const text = <>Page not found</>;
const subtext = (
    <>
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
    </>
);
const buttonText = <>Go back Home</>;
