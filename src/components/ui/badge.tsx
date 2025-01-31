import { View } from "react-native";
import { Text } from "./text";

interface Props {
  text: string;
  type?: "success" | "warn" | "error";
}

export function Badge(props: Props) {
  const { text, type } = props;

  const color = {
    success: {
      text: "#166534",
      bg: "#dcfce7",
    },
    warn: {
      text: "#854d0e",
      bg: "#fef9c3",
    },
    error: {
      text: "#991b1b",
      bg: "#fee2e2",
    },
    undefined: undefined,
  }[type || "undefined"];

  return (
    <View
      style={{ borderColor: color?.bg, backgroundColor: color?.bg }}
      className="flex flex-row justify-center items-center py-1 px-3 rounded-full border"
    >
      <Text
        style={{ color: color?.text }}
        className="text-xs text-black font-medium"
      >
        {text}
      </Text>
    </View>
  );
}
