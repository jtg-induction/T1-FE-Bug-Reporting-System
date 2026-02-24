import { UserProfileProps } from "apiService/request.types";
export interface PopoverContentProps {
  user: UserProfileProps;
  handleClose: () => void;
}

export interface PopoverProps {
  anchorEl: HTMLButtonElement | null;
  PopoverContent: React.ReactNode;
  handleClose: () => void;
}
