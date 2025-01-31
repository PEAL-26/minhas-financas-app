import "react-native-gesture-handler";
import "react-native-reanimated";
import "../styles/global.css";

import { useEffect } from "react";
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

// import { connectionDrizzle, openDatabase } from "@/db";

import migrations from "../../drizzle/migrations";
import { colors } from "@/styles/colors";

SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

const queryClient = new QueryClient();

export default function RootLayout() {
  // useDrizzleStudio(openDatabase);

  // const migration = useMigrations(connectionDrizzle, migrations);

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (migration?.error) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text>Oops! Migration error: {migration?.error?.message}</Text>
  //     </View>
  //   );
  // }

  if (!loaded /*|| !migration.success*/) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator color={colors.primary.DEFAULT} size="small" />
        <StatusBar style="dark" translucent animated />
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
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="dark" translucent animated />
              </QueryClientProvider>
            </AutocompleteDropdownContextProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
