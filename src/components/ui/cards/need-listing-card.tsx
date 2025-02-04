import { TouchableOpacity, View } from "react-native";
import { FolderIcon } from "lucide-react-native";

import { OperationTypes } from "@/types";
import { formatCurrency } from "@/helpers/currency";
import { PRIORITY_COLOR, PRIORITY_MAP, TYPES_MAP } from "@/constants";

import { Text } from "../text";
import { Badge } from "../badge";
import { Recurrence } from "../recurrence";

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
}
export function NeedListingCard(props: Props) {
  const { data } = props;

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View className="flex flex-col p-4 border rounded-md shadow bg-white border-zinc-200">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-base line-clamp-2" numberOfLines={2}>
            {data.title}
          </Text>
          <Badge
            text={PRIORITY_MAP[data.priority]}
            type={PRIORITY_COLOR[data.priority]}
          />
        </View>
        <View className="flex flex-row justify-between items-center mt-2">
          <View className="flex flex-row items-center gap-1">
            {data?.category?.name && (
              <>
                <FolderIcon
                  size={14}
                  color={"#52525b"}
                  className="text-zinc-600"
                />
                <Text className="text-sm text-zinc-600">
                  {data.category?.name}
                </Text>
              </>
            )}
          </View>
          <Text className="font-bold text-blue-600">
            {formatCurrency(data.amount)}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center mt-2">
          <Badge text={TYPES_MAP[data.type]} />
          <Recurrence value={data?.recurrence} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
