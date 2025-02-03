import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Animated, {
  withDelay,
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

import { colors } from "@/styles/colors";

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 40;

interface Props {
  isExpanded: SharedValue<boolean>;
  index: number;
  buttonLetter: string;
  icon?: any;
  onPress?(): void;
}

export const FloatingActionButton = (props: Props) => {
  const { isExpanded, index, buttonLetter, icon: Icon, onPress } = props;
  const animatedStyles = useAnimatedStyle(() => {
    // highlight-next-line
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    //highlight-next-line
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      activeOpacity={0.7}
      style={[animatedStyles, styles.button]}
    >
      {Icon && (
        <View
          style={styles.shadow}
          className="bg-white rounded-full w-7 h-7 flex flex-row justify-center items-center shadow"
        >
          <Icon size={16} color={colors.primary.DEFAULT} />
        </View>
      )}
      <Animated.Text style={[styles.shadow, styles.content]} className="shadow">
        {buttonLetter}
      </Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    height: 260,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    height: 28,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    zIndex: -2,
    gap: 8,
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    color: colors.primary.DEFAULT,
    fontWeight: 500,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
});
