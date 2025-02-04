import { CalendarIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import { formatDate } from "@/helpers/date";
import { formatCurrency } from "@/helpers/currency";

import { Text } from "../text";

type TransactionDataType = {
  id: number;
  title: string;
  date: Date;
  amount: number;
  type: "income" | "expense";
};

interface Props {
  data: TransactionDataType;
}

export function TransactionListingCard(props: Props) {
  const { data } = props;

  const color = {
    income: "#2cb547",
    expense: "#ef4444",
  }[data.type];

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View className="flex flex-col p-4 border rounded-md shadow bg-white border-zinc-200">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-cols">
            <Text
              className="font-bold text-base line-clamp-2"
              numberOfLines={2}
            >
              {data.title}
            </Text>
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
          </View>

          <Text style={{ color }} className="font-bold text-red-500">
            {`${data.type === "expense" ? "-" : "+"} ${formatCurrency(
              data.amount
            )}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
