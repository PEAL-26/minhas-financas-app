import { View } from "react-native";
import { Text } from "./text";

export const BADGE_COLOR = {
  success: {
    text: "#166534",
    bg: "#dcfce7",
  },
  info: {
    text: "#1e40af",
    bg: "#dbeafe",
  },
  warn: {
    text: "#854d0e",
    bg: "#fef9c3",
  },
  error: {
    text: "#991b1b",
    bg: "#fee2e2",
  },
  undefined: {
    text: "#27272a",
    bg: "#a1a1aa",
  },
};

interface Props {
  text: string;
  type?: "info" | "success" | "warn" | "error";
}

export function Badge(props: Props) {
  const { text, type } = props;
  const color = BADGE_COLOR[type || "undefined"];
  return (
    <View
      style={{
        borderColor: color?.bg,
        backgroundColor: type ? color?.bg : undefined,
      }}
      className="flex flex-row justify-center items-center py-1 px-3 rounded-full border border-zinc-400"
    >
      <Text
        style={{ color: color?.text }}
        className="text-xs text-zinc-800 font-medium"
      >
        {text}
      </Text>
    </View>
  );
}
