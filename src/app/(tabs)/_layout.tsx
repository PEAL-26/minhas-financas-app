import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { TabBar } from '@/components/ui/tab-bar';

export default function TabLayout() {
  return (
    <View className="relative flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ ...rest }) => <TabBar {...rest} />}
      />
    </View>
  );
}
