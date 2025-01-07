import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { ListCheckIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { cn } from "@/lib/utils";
import { TabBarButton } from "./tab-bar-button";

export type TabBarProps = BottomTabBarProps;

export function TabBar(props: TabBarProps) {
  const { state, navigation } = props;
  const router = useRouter();
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

  return (
    <View
      className={cn(
        "absolute inset-x-0 border-b border-gray-300 bg-white transition-all py-4 bottom-0"
      )}
    >
      <View className="relative flex-1 flex-row items-center justify-between px-6 ">
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Transações"
            icon={ListCheckIcon}
            isFocused={routeName === "transactions/index"}
            onPress={() => handlePress("transactions/index")}
            onLongPress={() => handleLongPress("transactions/index")}
          />
          <TabBarButton
            label="Rendas"
            icon={ListCheckIcon}
            isFocused={routeName === "incomes/index"}
            onPress={() => handlePress("incomes/index")}
            onLongPress={() => handleLongPress("incomes/index")}
          />
        </View>
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Despesas"
            icon={ListCheckIcon}
            isFocused={routeName === "expenses/index"}
            onPress={() => handlePress("expenses/index")}
            onLongPress={() => handleLongPress("expenses/index")}
          />
          <TabBarButton
            label="Necessidades"
            icon={ListCheckIcon}
            isFocused={routeName === "needs/index"}
            onPress={() => handlePress("needs/index")}
            onLongPress={() => handleLongPress("needs/index")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className="absolute flex flex-col items-center justify-center rounded-full bg-primary h-14 w-14 -top-14 right-1/2 shadow"
          onPress={() => router.push("/transactions/register" as any)}
        >
          <PlusIcon size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
