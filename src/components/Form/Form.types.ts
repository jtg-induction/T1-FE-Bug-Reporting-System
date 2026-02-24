import { ReactNode } from "react";

export interface FormComponentProps {
  title: string;
  children: ReactNode;
  buttonText: string;
  redirectText?: string;
  redirectPath?: string;
  onClick: () => Promise<void>;
}
