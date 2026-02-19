import type { Components } from '@mui/material/styles';

// // Local Font files
import InterRegularTTF from '@assets/fonts/inter/Inter-VariableFont.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/Inter-VariableFont.woff2';

// // TODO: Add necessary font face declarations here
const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: light;
        font-weight: 400;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: medium;
        font-weight: 600;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: bold;
        font-weight: 700;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };


    `;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            fontFaceDeclarations,
            html: {
                fontSize: '62.5%',
            },
        },
    },
};
