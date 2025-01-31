import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Text } from "../text";

interface Props extends BottomTabHeaderProps {}

export function Header(props: Props) {
  const { options } = props;
  const { title } = options;
  
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
