import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: 'fade' }}
      ></Stack.Screen>
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false, animation: 'fade' }}
      ></Stack.Screen>
    </Stack>
  )
}