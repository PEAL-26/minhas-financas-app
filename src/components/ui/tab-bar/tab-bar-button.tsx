import * as Haptics from 'expo-haptics';
import { TouchableOpacity } from 'react-native';

import { cn } from '@/lib/utils';
import { colors } from '@/styles/colors';
import { Text } from 'react-native';

interface Props {
  icon?: any;
  onPress?(): void;
  onLongPress?(): void;
  label: string;
  isFocused?: boolean;
}

export function TabBarButton(props: Props) {
  const { label, icon: Icon, isFocused, onPress, onLongPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Icon size={20} color={isFocused ? colors.primary.DEFAULT : '#374151'} />
      <Text className={cn('text-[8px]', isFocused && 'text-primary')}>
        {typeof label === 'string' ? label : ''}
      </Text>
    </TouchableOpacity>
  );
}
