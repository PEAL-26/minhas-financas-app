import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { Text } from '../text';

interface Props {
  label: string;
  className?: string;
}

export function SeparatorWithLabel({ label, className }: Props) {
  return (
    <View className={cn('my-5 flex flex-row items-center gap-2', className)}>
      <View className="h-[1px] w-full flex-1 bg-gray-300" />
      <Text className="text-gray-600">{label}</Text>
      <View className="h-[1px] w-full flex-1 bg-gray-300" />
    </View>
  );
}
