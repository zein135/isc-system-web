
export interface AddTextModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    onCreate: (name: string) => void;
}