import { useNavigate } from 'react-router-dom';

import { BasicPage } from '@components';
export const ErrorPage = () => {
    const navigate = useNavigate();
    const handleButton = () => void navigate('/');

    return (
        <>
            <BasicPage
                src="/assets/businessWoman.png"
                alt="Business Woman"
                text={text}
                subtext={subtext}
                handleButton={handleButton}
                buttonText={buttonText}
            />
        </>
    );
};

const text = <>Something has gone seriously wrong</>;
const subtext = (
    <>
        It&apos;s always time for a coffee break. We should be back by the time
        you finish your coffee.
    </>
);
const buttonText = <>Go back Home</>;
