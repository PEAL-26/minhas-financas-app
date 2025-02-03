import { ReactNode } from "react";

export interface BottomSheetBaseModalProps {
  children: ReactNode;
  title?: string;
  show?: boolean;
  onClose?(): void;
}
