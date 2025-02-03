import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import { ActivityIndicator, ListRenderItemInfo, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { colors } from "@/styles/colors";

type SwipeableWillOpenProps<T> = {
  item?: T;
  direction: "left" | "right";
  currentRef: any;
};

interface Props<T extends object> {
  children: ReactNode;
  item?: T;
  onSwipeableWillOpen?(props: SwipeableWillOpenProps<T>): void;
  renderLeftActions?: ReactNode;
  renderRightActions?: ReactNode;
}

export function SwipeableActions<T extends object = any>(props: Props<T>) {
  const { children, item, onSwipeableWillOpen } = props;
  let currentRef: any = null;

  return (
    <Swipeable
      ref={(swipeable) => (currentRef = swipeable)}
      containerStyle={styles.swipeableContainer}
      overshootRight={false}
      leftThreshold={7}
      rightThreshold={7}
      onSwipeableWillOpen={(direction) =>
        onSwipeableWillOpen?.({ item, direction, currentRef })
      }
      renderLeftActions={() => {
        return (
          <View style={styles.leftContainer}>
            {/* <Option icon="delete" backgroundColor={colors.danger} /> */}
          </View>
        );
      }}
      renderRightActions={() => {
        return (
          <View style={styles.rightContainer}>
            {/* <Option
              icon="mode-edit"
              backgroundColor="#033856"
              onPress={() => onEdit?.(String(item.id))}
            /> */}
          </View>
        );
      }}
    >
      {children}
    </Swipeable>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // backgroundColor: colors.background,
    paddingHorizontal: 16,
    //color: colors.text,
  },
  title: {
    // color: colors.primary,
    fontSize: 20,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  content: {
    gap: 16,
    paddingBottom: 90,
    paddingTop: 16,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    // backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  swipeableContainer: {
    borderRadius: 8,
    // backgroundColor: colors.cardBackground,
  },
  rightContainer: {
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
    // backgroundColor: colors.danger,
  },
});
