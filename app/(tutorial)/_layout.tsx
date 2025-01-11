import { Stack } from 'expo-router';

export default function TutorialLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
    </Stack>
  );
}
