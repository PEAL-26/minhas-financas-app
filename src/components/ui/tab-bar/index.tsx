import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  LayoutDashboardIcon,
  ListIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react-native';
import { useWindowDimensions, View } from 'react-native';

import { cn } from '@/lib/utils';

import { shadowStyles } from '@/styles/styles';
import { useEffect, useState } from 'react';
import { AddButton } from './add-button';
import { TabBarButton } from './tab-bar-button';

export type TabBarProps = BottomTabBarProps;

export function TabBar(props: TabBarProps) {
  const [loadedScreen, setLoadedScreen] = useState(false);

  const { state, navigation } = props;
  const routeName = state.routeNames[state.index];

  const getRouteByName = (name: string) => state.routes.find((r) => r.name === name);

  const handlePress = (name: string) => {
    const isFocused = name === routeName;
    const route = getRouteByName(name);

    const event = navigation.emit({
      type: 'tabPress',
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
      type: 'tabLongPress',
      target: route?.key,
    });
  };

  const dimensions = useWindowDimensions();

  useEffect(() => {
    setLoadedScreen(true);
  }, []);

  return (
    <View
      style={[shadowStyles.shadow, { display: loadedScreen ? 'flex' : 'none' }]}
      className={cn(
        'absolute inset-x-0 bottom-0 border-b border-gray-300 bg-white py-4 transition-all',
      )}
    >
      <View className="relative flex-1 flex-row items-center justify-between px-6">
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Dashboard"
            icon={LayoutDashboardIcon}
            isFocused={routeName === 'index'}
            onPress={() => handlePress('index')}
            onLongPress={() => handleLongPress('index')}
          />
          <TabBarButton
            label="Rendas"
            icon={TrendingUpIcon}
            isFocused={routeName === 'incomes/index'}
            onPress={() => handlePress('incomes/index')}
            onLongPress={() => handleLongPress('incomes/index')}
          />
        </View>
        <View className="flex-row items-center gap-4">
          <TabBarButton
            label="Despesas"
            icon={TrendingDownIcon}
            isFocused={routeName === 'expenses/index'}
            onPress={() => handlePress('expenses/index')}
            onLongPress={() => handleLongPress('expenses/index')}
          />
          <TabBarButton
            label="Necessidades"
            icon={ListIcon}
            isFocused={routeName === 'needs/index'}
            onPress={() => handlePress('needs/index')}
            onLongPress={() => handleLongPress('needs/index')}
          />
        </View>
        <View
          style={[
            {
              right: dimensions.width / 2 - 32,
            },
            shadowStyles.shadow,
          ]}
          className="absolute -top-[95%] flex h-16 w-16 flex-col items-center justify-center self-center rounded-full"
        >
          <AddButton />
        </View>
      </View>
    </View>
  );
}
