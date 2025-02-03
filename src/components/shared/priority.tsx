import { TouchableOpacity, View } from "react-native";
import { Label } from "../ui/label";
import { BADGE_COLOR } from "../ui/badge";
import { PRIORITY_COLOR, PRIORITY_MAP } from "@/constants";
import { Text } from "../ui/text";

interface Props {
  form: any;
}
export function PriorityComponent(props: Props) {
  const { form } = props;

  return (
    <View className="flex flex-row gap-2 justify-between items-center">
      <Label htmlFor="priority">Prioridade</Label>
      <View className="flex flex-row items-center gap-2">
        {[0 as const, 1 as const, 2 as const].map((p) => (
          <TouchableOpacity
            onPress={() => form.setValue("priority", p)}
            style={[
              {
                padding: 4,
                borderRadius: 4,
                backgroundColor:
                  p === form.watch("priority")
                    ? BADGE_COLOR[PRIORITY_COLOR[p]]?.bg
                    : undefined,
              },
            ]}
          >
            <Text
              style={{
                color: BADGE_COLOR[PRIORITY_COLOR[p]]?.text,
              }}
              className="text-xs"
            >
              {PRIORITY_MAP[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
