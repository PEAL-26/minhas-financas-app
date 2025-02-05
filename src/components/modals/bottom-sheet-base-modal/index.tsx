import { Text } from '@/components/ui/text';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { useCallback } from 'react';

import { BottomSheetBaseModalProps, ChildrenFn } from './type';
import { useBottomSheetBaseModal } from './use-bottom-sheet-base-modal';

export function BottomSheetBaseModal(props: BottomSheetBaseModalProps) {
  const { title, children } = props;
  const { snapPoints, bottomSheetModalRef, handleSheetChanges } = useBottomSheetBaseModal(props);

  const renderBackdrop = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} />
    ),
    [],
  );

  const renderChildren = () => {
    if (typeof children === 'function') {
      return (children as ChildrenFn)({});
    }

    return children;
  };

  return (
    <BottomSheetModal
      index={1}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <Text className="flex items-center justify-center py-2 text-center text-lg font-bold">
        {title}
      </Text>
      <BottomSheetScrollView style={{ width: '100%' }}>{renderChildren()}</BottomSheetScrollView>
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
