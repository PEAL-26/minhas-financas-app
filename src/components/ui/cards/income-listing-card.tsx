import { Status, Types } from "@/types";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../text";
import { Badge } from "../badge";
import { STATUS_COLOR, STATUS_MAP, TYPES_MAP } from "@/constants";
import { CalendarIcon } from "lucide-react-native";
import { getRecurrence } from "@/helpers/recurrence";

type IncomeDataType = {
  id: number;
  title: string;
  description?: string;
  date: Date;
  amount: number;
  type: Types;
  recurrence?: number | null;
  status: Status;
};

interface Props {
  data: IncomeDataType;
}
export function IncomeListingCard(props: Props) {
  const { data } = props;
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-AO", { dateStyle: "medium" }).format(
      date
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  };

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View className="flex flex-col p-4 border rounded-md shadow bg-white border-zinc-200">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-base line-clamp-2" numberOfLines={2}>
            {data.title}
          </Text>
          <Badge
            text={STATUS_MAP[data.status]}
            type={STATUS_COLOR[data.status]}
          />
        </View>
        {data?.description && (
          <Text className="text-sm text-zinc-500 line-clamp-1" numberOfLines={2}>{data.description}</Text>
        )}
        <View className="flex flex-row justify-between items-center mt-2">
          <View className="flex flex-row items-center gap-1">
            <CalendarIcon size={14} className="text-zinc-600" />
            <Text className="text-sm text-zinc-600">
              {formatDate(data.date)}
            </Text>
          </View>
          <Text className="font-bold text-primary">
            {formatCurrency(data.amount)}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center mt-2">
          <Badge text={TYPES_MAP[data.type]} />
          <Text>{getRecurrence(data?.recurrence)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
