import { ReactNode } from 'react';

export type ChildrenFnProps = {
  height?: number;
  width?: number;
};

export type ChildrenFn = (props: ChildrenFnProps) => ReactNode;
export interface BottomSheetBaseModalProps {
  children: ReactNode | ChildrenFn;
  title?: string;
  show?: boolean;
  onClose?(): void;
  isLoading?: boolean;
}
