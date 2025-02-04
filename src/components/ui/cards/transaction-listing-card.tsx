import { CalendarIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { formatCurrency } from '@/helpers/currency';
import { formatDate } from '@/helpers/date';

import { shadowStyles } from '@/styles/styles';
import { Text } from '../text';

type TransactionDataType = {
  id: number;
  title: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense';
};

interface Props {
  data: TransactionDataType;
  onPress?(): void;
}

export function TransactionListingCard(props: Props) {
  const { data, onPress } = props;

  const color = {
    income: '#2cb547',
    expense: '#ef4444',
  }[data.type];

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View
        style={shadowStyles.shadow}
        className="flex flex-col rounded-md border border-zinc-200 bg-white p-4"
      >
        <View className="flex flex-row items-center justify-between">
          <View className="flex-cols flex">
            <Text className="line-clamp-2 text-base font-bold" numberOfLines={2}>
              {data.title}
            </Text>
            <View className="flex flex-row items-center gap-1">
              <CalendarIcon size={14} color={'#52525b'} className="text-zinc-600" />
              <Text className="text-sm text-zinc-600">{formatDate(data.date)}</Text>
            </View>
          </View>

          <Text style={{ color }} className="font-bold text-red-500">
            {`${data.type === 'expense' ? '-' : '+'} ${formatCurrency(data.amount)}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
