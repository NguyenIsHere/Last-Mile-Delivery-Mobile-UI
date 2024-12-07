import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/components/useColorScheme'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    ...FontAwesome.font
  })

  useEffect(() => {
    if (error) throw error // Bắt lỗi nếu việc tải font thất bại
  }, [error])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null // Hiển thị màn hình loading nếu font chưa được tải
  }

  return <RootLayoutNav />
}

function RootLayoutNav () {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        <Stack.Screen
          name='addressInput'
          options={{
            title: 'Nhập địa chỉ', // Tiêu đề màn hình
            headerShown: true, // Hiển thị nút Back
            animation: 'fade'
          }}
        />
        <Stack.Screen
          name='productDetail'
          options={{
            title: 'Chi tiết món hàng', // Tiêu đề màn hình
            headerShown: true, // Hiển thị nút Back
            animation: 'fade'
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
