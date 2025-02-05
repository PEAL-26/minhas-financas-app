import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/styles/colors';
import { shadowStyles } from '@/styles/styles';

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
    const moveValue = isExpanded.get() ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    //highlight-next-line
    const delay = index * 100;

    const scaleValue = isExpanded.get() ? 1 : 0;

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
      activeOpacity={0.8}
      style={[animatedStyles, styles.button]}
    >
      {Icon && (
        <View
          style={shadowStyles.shadow}
          className="flex h-7 w-7 flex-row items-center justify-center rounded-full bg-white"
        >
          <Icon size={16} color={colors.primary.DEFAULT} />
        </View>
      )}
      <Animated.Text style={[shadowStyles.shadow, styles.content]}>{buttonLetter}</Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: 28,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: -2,
    gap: 8,
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    color: colors.primary.DEFAULT,
    fontWeight: 500,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
});
