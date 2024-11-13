import * as QuickActions from 'expo-quick-actions'
import { useQuickActionRouting } from 'expo-quick-actions/router'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Platform } from 'react-native'

// SplashScreen.preventAutoHideAsync()

export default function Layout() {
  useQuickActionRouting()

  useEffect(() => {
    QuickActions.setItems([
      {
        title: 'Add a plant',
        icon: Platform.OS === 'ios' ? 'symbol:leaf' : 'leaf',
        id: '0',
        params: { href: '/new' }
      }
    ])
  }, [])

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
      <Stack.Screen
        name="new"
        options={{
          presentation: 'modal',
          title: 'New plant'
        }}
      />
    </Stack>
  )
}
