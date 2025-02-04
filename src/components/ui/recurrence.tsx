import { getRecurrence } from '@/helpers/recurrence';
import { RepeatIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from './text';

interface Props {
  value?: number | null;
}

export function Recurrence(props: Props) {
  const { value } = props;

  if (!value) return null;

  return (
    <View className="flex flex-row items-center gap-1 text-xs text-blue-600">
      <RepeatIcon
        size={12}
        style={{ marginRight: 4, width: 12, height: 12 }}
        color={'#2563eb'}
        className="mr-1 h-3 w-3 text-blue-600"
      />
      <Text className="text-xs text-blue-600">{getRecurrence(value)}</Text>
    </View>
  );
}
