import { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

/* Common Config for both PROD and DEV mode */
export const commonConfig: UserConfig = {
    plugins: [react(), tsconfigPaths()],
    /* Customizing build folder structure */
    build: {
        /* 
        Imported or referenced assets that are smaller than 4KiB threshold will be inlined as base64 URLs to avoid extra http requests.
        Set to 0 to disable inlining altogether
        */
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (/\.(jpe?g)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]';
                    }
                    if (/\.(woff2|ttf)$/.test(name ?? ''))
                        return 'assets/fonts/[name]-[hash][extname]';
                    return '[name]-[hash][extname]';
                },
            },
        },
    },
};
