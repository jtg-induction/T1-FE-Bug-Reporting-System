export interface BasicPageProps {
    src: string;
    alt: string;
    text: React.ReactNode;
    subtext: React.ReactNode;
    buttonText: React.ReactNode;
    handleButton: () => void;
}
