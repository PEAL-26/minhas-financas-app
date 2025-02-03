import {
  ArrowDownUpIcon,
  ListIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react-native";
import { useWindowDimensions, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { cn } from "@/lib/utils";

import { TabBarButton } from "./tab-bar-button";
import { AddButton } from "./add-button";

export type TabBarProps = BottomTabBarProps;

export function TabBar(props: TabBarProps) {
  const { state, navigation } = props;
  const routeName = state.routeNames[state.index];

  const getRouteByName = (name: string) =>
    state.routes.find((r) => r.name === name);

  const handlePress = (name: string) => {
    const isFocused = name === routeName;
    const route = getRouteByName(name);

    const event = navigation.emit({
      type: "tabPress",
      target: route?.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  const handleLongPress = (name: string) => {
    const route = getRouteByName(name);

    navigation.emit({
      type: "tabLongPress",
      target: route?.key,
    });
  };

  const dimensions = useWindowDimensions();

  return (
    <View
      className={cn(
        "absolute inset-x-0 border-b border-gray-300 bg-white transition-all py-4 bottom-0 shadow-lg"
      )}
    >
      <View className="relative flex-1 flex-row items-center justify-between px-6 ">
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Transações"
            icon={ArrowDownUpIcon}
            isFocused={routeName === "transactions/index"}
            onPress={() => handlePress("transactions/index")}
            onLongPress={() => handleLongPress("transactions/index")}
          />
          <TabBarButton
            label="Rendas"
            icon={TrendingUpIcon}
            isFocused={routeName === "incomes/index"}
            onPress={() => handlePress("incomes/index")}
            onLongPress={() => handleLongPress("incomes/index")}
          />
        </View>
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Despesas"
            icon={TrendingDownIcon}
            isFocused={routeName === "expenses/index"}
            onPress={() => handlePress("expenses/index")}
            onLongPress={() => handleLongPress("expenses/index")}
          />
          <TabBarButton
            label="Necessidades"
            icon={ListIcon}
            isFocused={routeName === "needs/index"}
            onPress={() => handlePress("needs/index")}
            onLongPress={() => handleLongPress("needs/index")}
          />
        </View>
        <View
          style={{
            right: dimensions.width / 2 - 40,
          }}
          className="h-20 w-20 rounded-full bg-white flex flex-col items-center justify-center self-center -top-[95%] absolute right-[calc(50%-40)]"
        >
          <AddButton />
        </View>
      </View>
    </View>
  );
}
