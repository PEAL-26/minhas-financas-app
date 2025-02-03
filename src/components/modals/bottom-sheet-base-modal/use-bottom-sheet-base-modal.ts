import { useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetBaseModalProps } from "./type";

export function useBottomSheetBaseModal(props: BottomSheetBaseModalProps) {
  const { show, onClose } = props;

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["90%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
      if (index === -1) {
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (show) {
      handlePresentModalPress();
    }
  }, [handlePresentModalPress, show]);

  return { snapPoints, bottomSheetModalRef, handleSheetChanges };
}
