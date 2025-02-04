import "react-native-gesture-handler";
import "react-native-reanimated";
import "../styles/global.css";

import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View } from "react-native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import migrations from "../../drizzle/migrations";
import { colors } from "@/styles/colors";
import { connectionDrizzle, openDatabase } from "@/db/connection";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  useDrizzleStudio(openDatabase);
  const migration = useMigrations(connectionDrizzle, migrations);

  const [fontLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [screenLoaded, setScreenLoaded] = useState(true);

  useEffect(() => {
    if (fontLoaded && screenLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, screenLoaded]);

  if (migration?.error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Oops! Migration error: {migration?.error?.message}</Text>
      </View>
    );
  }

  if (!fontLoaded || !screenLoaded || !migration.success) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator color={colors.primary.DEFAULT} size="small" />
        <StatusBar style="dark" translucent animated backgroundColor="transparent"  />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <AutocompleteDropdownContextProvider>
              <QueryClientProvider client={queryClient}>
                <View
                  style={{ flex: 1 }}
                  onLayout={() => {
                    setScreenLoaded(true);
                  }}
                >
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </View>
                <StatusBar style="dark" translucent animated backgroundColor="transparent" />
              </QueryClientProvider>
            </AutocompleteDropdownContextProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
