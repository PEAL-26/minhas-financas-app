import { FolderIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { PRIORITY_COLOR, PRIORITY_MAP, TYPES_MAP } from '@/constants';
import { formatCurrency } from '@/helpers/currency';
import { OperationTypes } from '@/types';

import { shadowStyles } from '@/styles/styles';
import { Badge } from '../badge';
import { Recurrence } from '../recurrence';
import { Text } from '../text';

type NeedDataType = {
  id: number;
  title: string;
  category?: { name: string };
  description?: string;
  priority: 0 | 1 | 2;
  amount: number;
  type: OperationTypes;
  recurrence?: number | null;
};

interface Props {
  data: NeedDataType;
  onPress?(): void;
}

export function NeedListingCard(props: Props) {
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
          <Badge text={PRIORITY_MAP[data.priority]} type={PRIORITY_COLOR[data.priority]} />
        </View>
        <View className="mt-2 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-1">
            {data?.category?.name && (
              <>
                <FolderIcon size={14} color={'#52525b'} className="text-zinc-600" />
                <Text className="text-sm text-zinc-600">{data.category?.name}</Text>
              </>
            )}
          </View>
          <Text className="font-bold text-blue-600">{formatCurrency(data.amount)}</Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Badge text={TYPES_MAP[data.type]} />
          <Recurrence value={data?.recurrence} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
