import { RepeatIcon } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "./text";
import { getRecurrence } from "@/helpers/recurrence";

interface Props {
  value?: number | null;
}

export function Recurrence(props: Props) {
  const { value } = props;

  if (!value) return null;

  return (
    <View className="flex flex-row gap-1 items-center text-xs text-blue-600">
      <RepeatIcon size={12} className="mr-1 h-3 w-3 text-blue-600" />
      <Text className="text-xs text-blue-600">{getRecurrence(value)}</Text>
    </View>
  );
}
