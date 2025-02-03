import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Text } from "@/components/ui/text";

import { useBottomSheetBaseModal } from "./use-bottom-sheet-base-modal";
import { BottomSheetBaseModalProps } from "./type";

export function BottomSheetBaseModal(props: BottomSheetBaseModalProps) {
  const { title, children } = props;
  const { snapPoints, bottomSheetModalRef, handleSheetChanges } =
    useBottomSheetBaseModal(props);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => <BottomSheetBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModal
      index={1}
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>{title}</Text>
        <BottomSheetScrollView style={{ width: "100%" }}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
