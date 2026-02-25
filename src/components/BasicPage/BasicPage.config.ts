import notFoundImage from '@assets/images/404.webp';
import errorPageImage from '@assets/images/businessWoman.webp';

import { BasicPageData } from './BasicPage.types';

export const BASIC_PAGE_DATA: Record<string, BasicPageData> = {
    ERROR: {
        src: errorPageImage,
        alt: 'Error Image',
        text: 'Something has gone seriously wrong',
        subtext:
            'It&apos;s always time for a coffee break. We should be back by the time you finish your coffee.',
        buttonText: 'Go back Home',
    },
    NOT_FOUND: {
        src: notFoundImage,
        alt: 'Not Found Image',
        text: 'Page not found',
        subtext:
            'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
        buttonText: 'Go back Home',
    },
};
