import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Option } from './option';

type SwipeableWillOpenProps<T> = {
  item?: T;
  direction: 'left' | 'right';
  currentRef: any;
};

interface Props<T extends object> {
  children: ReactNode;
  item?: T;
  onSwipeableWillOpen?(props: SwipeableWillOpenProps<T>): void;
  onEdit?(): void;
  onDelete?(): void;
  renderLeftActions?: ReactNode;
  renderRightActions?: ReactNode;
}

export function SwipeableActions<T extends object = any>(props: Props<T>) {
  const { children, item, onSwipeableWillOpen, onDelete, onEdit } = props;
  let currentRef: any = null;

  return (
    <Swipeable
      ref={(swipeable) => (currentRef = swipeable)}
      containerStyle={styles.swipeableContainer}
      overshootRight={false}
      leftThreshold={10}
      friction={1.5}
      onSwipeableWillOpen={(direction) => onSwipeableWillOpen?.({ item, direction, currentRef })}
      renderLeftActions={() => {
        return (
          <View style={styles.leftContainer}>
            <Option icon="delete" backgroundColor="#ef4444" onPress={() => onDelete?.()} />
          </View>
        );
      }}
      renderRightActions={() => {
        return (
          <View style={styles.rightContainer}>
            <Option icon="mode-edit" backgroundColor="#2563eb" onPress={() => onEdit?.()} />
          </View>
        );
      }}
    >
      {children}
    </Swipeable>
  );
}

export const styles = StyleSheet.create({
  swipeableContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ef4444',
  },
});
