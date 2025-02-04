import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Header } from '@/components/ui/header';
import { TabBar } from '@/components/ui/tab-bar';

export default function TabLayout() {
  return (
    <View className="relative flex-1">
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: "",
          // headerShown: false,
          // headerTransparent: true,
          header: Header,
        }}
        tabBar={({ ...rest }) => <TabBar {...rest} />}
      />
    </View>
  );
}
