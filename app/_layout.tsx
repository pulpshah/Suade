import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { AuthProvider } from "../context/auth";
import { ThemeProvider } from "../context/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    RocGroteskRegular: require("../assets/fonts/RocGrotesk-Regular.otf"),
    RocGroteskBold: require("../assets/fonts/RocGrotesk-Bold.otf"),
    NotoSans: require("../assets/fonts/NotoSans.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            style="dark"
            translucent={true}
            backgroundColor="transparent"
          />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tutorial)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: -10,
  },
});
