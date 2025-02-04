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
import { getPercentScreenSize } from "@/helpers/get-percent-screen-size";

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
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <Text className="flex items-center justify-center text-center py-2 font-bold text-lg">
        {title}
      </Text>
      <BottomSheetScrollView style={{ width: "100%" }}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "center",
//     backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
// });
