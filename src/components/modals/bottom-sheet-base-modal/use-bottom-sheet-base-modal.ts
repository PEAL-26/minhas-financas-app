import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { BottomSheetBaseModalProps } from './type';

export function useBottomSheetBaseModal(props: BottomSheetBaseModalProps) {
  const { show, onClose, isLoading } = props;

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['90%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (isLoading) return;

      if (index === -1) {
        onClose?.();
      }
    },
    [onClose, isLoading],
  );

  useEffect(() => {
    if (show) {
      handlePresentModalPress();
    }
  }, [handlePresentModalPress, show]);

  return { snapPoints, bottomSheetModalRef, handleSheetChanges };
}
