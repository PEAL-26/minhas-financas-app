import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { TabBar } from "@/components/ui/tab-bar";

export default function TabLayout() {
  return (
    <View className="flex-1 relative">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "",
          headerShown: false,
          headerTransparent: true,
        }}
        tabBar={({ ...rest }) => <TabBar {...rest} />}
      />
    </View>
  );
}
