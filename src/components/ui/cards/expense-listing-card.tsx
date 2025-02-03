import { CalendarIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import {
  PRIORITY_COLOR,
  PRIORITY_MAP,
  STATUS_COLOR,
  STATUS_MAP,
  TYPES_MAP,
} from "@/constants";
import { Status, OperationTypes } from "@/types";
import { formatDate } from "@/helpers/date";
import { formatCurrency } from "@/helpers/currency";

import { Text } from "../text";
import { Badge } from "../badge";
import { Recurrence } from "../recurrence";

type ExpenseDataType = {
  id: number;
  title: string;
  category?: string;
  date: Date;
  amount: number;
  priority: 0 | 1 | 2;
  type: OperationTypes;
  recurrence?: number | null;
  status: Status;
};

interface Props {
  data: ExpenseDataType;
}
export function ExpenseListingCard(props: Props) {
  const { data } = props;

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View className="flex flex-col p-4 border rounded-md shadow bg-white border-zinc-200">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-base line-clamp-2" numberOfLines={2}>
            {data.title}
          </Text>
          <Badge
            text={STATUS_MAP[data.status]}
            type={data.status === "done" ? "info" : STATUS_COLOR[data.status]}
          />
        </View>
        {data?.category && (
          <Text
            className="text-zinc-600 text-xs line-clamp-1"
            numberOfLines={1}
          >
            {data.category}
          </Text>
        )}
        <View className="flex flex-row justify-between items-center mt-2">
          <View className="flex flex-row items-center gap-1">
            <CalendarIcon
              size={14}
              color={"#52525b"}
              className="text-zinc-600"
            />
            <Text className="text-sm text-zinc-600">
              {formatDate(data.date)}
            </Text>
          </View>
          <Text className="font-bold text-red-500">
            {formatCurrency(data.amount)}
          </Text>
        </View>

        <View className="flex flex-col gap-2 mt-2">
          <View className="flex flex-row justify-between items-center">
            <Badge text={TYPES_MAP[data.type]} />
            <Badge
              text={PRIORITY_MAP[data.priority]}
              type={PRIORITY_COLOR[data.priority]}
            />
          </View>

          <Recurrence value={data?.recurrence} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
