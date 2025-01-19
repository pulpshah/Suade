import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="landing">
      <Stack.Screen name="landing" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="onBoarding" />
      <Stack.Screen name="personaLab" />
    </Stack>
  );
}
