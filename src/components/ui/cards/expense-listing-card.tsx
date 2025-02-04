import { CalendarIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { PRIORITY_COLOR, PRIORITY_MAP, STATUS_COLOR, STATUS_MAP, TYPES_MAP } from '@/constants';
import { formatCurrency } from '@/helpers/currency';
import { formatDate } from '@/helpers/date';
import { OperationTypes, Status } from '@/types';

import { shadowStyles } from '@/styles/styles';
import { Badge } from '../badge';
import { Recurrence } from '../recurrence';
import { Text } from '../text';

type ExpenseDataType = {
  id: number;
  title: string;
  category?: { name: string };
  date: Date;
  amount: number;
  priority: 0 | 1 | 2;
  type: OperationTypes;
  recurrence?: number | null;
  status: Status;
};

interface Props {
  data: ExpenseDataType;
  onPress?(): void;
}
export function ExpenseListingCard(props: Props) {
  const { data, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View
        style={shadowStyles.shadow}
        className="flex flex-col rounded-md border border-zinc-200 bg-white p-4"
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="line-clamp-2 text-base font-bold" numberOfLines={2}>
            {data.title}
          </Text>
          <Badge
            text={STATUS_MAP[data.status]}
            type={data.status === 'done' ? 'info' : STATUS_COLOR[data.status]}
          />
        </View>
        {data?.category?.name && (
          <Text className="line-clamp-1 text-xs text-zinc-600" numberOfLines={1}>
            {data.category.name}
          </Text>
        )}
        <View className="mt-2 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-1">
            <CalendarIcon size={14} color={'#52525b'} className="text-zinc-600" />
            <Text className="text-sm text-zinc-600">{formatDate(data.date)}</Text>
          </View>
          <Text className="font-bold text-red-500">{formatCurrency(data.amount)}</Text>
        </View>

        <View className="mt-2 flex flex-col gap-2">
          <View className="flex flex-row items-center justify-between">
            <Badge text={TYPES_MAP[data.type]} />
            <Badge text={PRIORITY_MAP[data.priority]} type={PRIORITY_COLOR[data.priority]} />
          </View>

          <Recurrence value={data?.recurrence} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
