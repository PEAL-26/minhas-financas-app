import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Item<TValue> = { value: TValue; title: string };

export interface SwitchToggleTextProps<TValue> {
  items: Item<TValue>[];
  item?: Item<TValue>;
  value?: TValue;
  defaultItem?: Item<TValue>;
  defaultValue?: TValue;
  duration?: number;
  onChangeValue?(value: TValue): void;
  trackColors?: { on?: string; off?: string };
}

export function SwitchToggleText<Tvalue = any>(props: SwitchToggleTextProps<Tvalue>) {
  const {
    items,
    item,
    value,
    defaultValue,
    defaultItem,
    onChangeValue,
    duration = 400,
    trackColors = { on: '#22c55e', off: '#f97316' },
  } = props;

  const isOn = useSharedValue(false);

  const trackHeight = useSharedValue(0);
  const trackWidth = useSharedValue(0);

  const thumbHeight = useSharedValue(0);
  const thumbWidth = useSharedValue(0);

  const [currentItem, setCurrentValue] = useState(() => {
    if (defaultItem) return defaultItem;
    if (defaultValue) {
      return items.find((i) => i.value === defaultValue);
    }

    return items?.[0];
  });

  const handleChangeItem = useCallback(
    (value: boolean, press = false) => {
      if (items.length === 2) {
        isOn.value = value;

        setTimeout(() => {
          const item = value ? items[1] : items[0];
          setCurrentValue(item);
          if (press) {
            onChangeValue?.(item.value);
          }
        }, duration);
      }
    },
    [duration, isOn, items, onChangeValue],
  );

  const handlePress = () => {
    handleChangeItem(!isOn.get(), true);
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(isOn.get()),
      [0, 1],
      [trackColors.off || '#f97316', trackColors.on || '#22c55e'],
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: trackHeight.get() / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(isOn.get()),
      [0, 1],
      [0, trackWidth.get() - trackHeight.get() - (thumbWidth.get() - thumbHeight.get())],
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: trackHeight.get() / 2,
    };
  });

  useEffect(() => {
    if (item) {
      const index = items.findIndex((i) => i.value === item.value);
      handleChangeItem(index === 1);
    } else if (value) {
      const index = items.findIndex((i) => i.value === value);
      handleChangeItem(index === 1);
    }
  }, [handleChangeItem, item, items, value]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={(e) => {
          trackHeight.value = e.nativeEvent.layout.height;
          trackWidth.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, trackAnimatedStyle]}
      >
        <Animated.View
          onLayout={(e) => {
            thumbHeight.value = e.nativeEvent.layout.height;
            thumbWidth.value = e.nativeEvent.layout.width;
          }}
          style={[switchStyles.thumb, thumbAnimatedStyle]}
        >
          <Animated.Text className="text-xs font-medium">{currentItem?.title}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const switchStyles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    height: 40,
    padding: 5,
    width: 130,
  },
  thumb: {
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
