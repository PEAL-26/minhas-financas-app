import { CalendarIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { STATUS_COLOR, STATUS_MAP, TYPES_MAP } from '@/constants';
import { formatCurrency } from '@/helpers/currency';
import { formatDate } from '@/helpers/date';
import { OperationTypes, Status } from '@/types';

import { shadowStyles } from '@/styles/styles';
import { Badge } from '../badge';
import { Recurrence } from '../recurrence';
import { Text } from '../text';

type IncomeDataType = {
  id: number;
  title: string;
  date: Date;
  amount: number;
  type: OperationTypes;
  recurrence?: number | null;
  status: Status;
};

interface Props {
  data: IncomeDataType;
  onPress?(): void;
}
export function IncomeListingCard(props: Props) {
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
          <Badge text={STATUS_MAP[data.status]} type={STATUS_COLOR[data.status]} />
        </View>
        <View className="mt-2 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-1">
            <CalendarIcon size={14} color={'#52525b'} className="text-zinc-600" />
            <Text className="text-sm text-zinc-600">{formatDate(data.date)}</Text>
          </View>
          <Text className="font-bold text-primary">{formatCurrency(data.amount)}</Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Badge text={TYPES_MAP[data.type]} />
          <Recurrence value={data?.recurrence} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
