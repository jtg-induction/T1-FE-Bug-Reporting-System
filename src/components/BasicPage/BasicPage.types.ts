/**
 * A constant object defining the possible states for scanner actions.
 * @type {Readonly<{notFound: 'NOT_FOUND', error: 'ERROR'}>}
 */
export const ScannerAction = {
    notFound: 'NOT_FOUND',
    error: 'ERROR',
} as const;

/**
 * Represents the keys of the ScannerAction object.
 * Expected values: 'notFound' | 'error'
 * @typedef {keyof typeof ScannerAction} ScannerActionKey
 */
type ScannerActionKey = keyof typeof ScannerAction;

/**
 * Props for the BasicPage component.
 * @interface BasicPageProps
 * @property {function(): void} handleButton - Callback function executed when the primary action button is clicked.
 * @property {ScannerActionKey} type - The current scanner state key used to determine page logic or styling.
 */
export interface BasicPageProps {
    handleButton: () => void;
    type: ScannerActionKey;
}

/**
 * Data structure containing the content and assets for a BasicPage.
 * @interface BasicPageData
 * @property {string} src - The URL or path for the primary image/icon.
 * @property {string} alt - Accessibility text for the image.
 * @property {string} text - The main heading or title text for the page.
 * @property {string} subtext - Supporting description or instructional text.
 * @property {string} buttonText - The label text to be displayed inside the button.
 */
export interface BasicPageData {
    src: string;
    alt: string;
    text: string;
    subtext: string;
    buttonText: string;
}
