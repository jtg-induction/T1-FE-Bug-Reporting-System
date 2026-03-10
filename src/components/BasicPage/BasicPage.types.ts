export interface BasicPageProps {
    handleButton: () => void;
    type: ScannerActionKey;
}

export const ScannerAction = {
    notFound: 'NOT_FOUND',
    error: 'ERROR',
} as const;

type ScannerActionKey = keyof typeof ScannerAction;

export interface BasicPageData {
    src: string;
    alt: string;
    text: string;
    subtext: string;
    buttonText: string;
}
