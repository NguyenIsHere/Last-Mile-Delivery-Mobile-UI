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

import { OrderProvider } from '../context/orderContext'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'

import { useRouter } from 'expo-router'

import LeftArrow from '../assets/icons/angle-small-left.svg'

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

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof LeftArrow>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

function RootLayoutNav () {
  const colorScheme = useColorScheme()
  const router = useRouter()

  return (
    <OrderProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
          <Stack.Screen
            name='addressInput'
            options={{
              title: 'Nhập địa chỉ', // Tiêu đề màn hình
              headerShown: false, // Hiển thị nút Back
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
          <Stack.Screen
            name='senderInfo'
            options={{
              title: 'Thông tin người gửi',
              headerShown: false,
              animation: 'fade'
            }}
          />
          <Stack.Screen
            name='receiverInfo'
            options={{
              title: 'Thông tin người nhận',
              headerShown: false,
              animation: 'fade'
            }}
          />
          <Stack.Screen
            name='orderDetail'
            options={{
              title: 'Chi tiết đơn hàng', // Tiêu đề màn hình
              animation: 'fade',
              header: () => (
                <View style={styles.customHeader}>
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                  >
                    <SvgIcon Icon={LeftArrow} color='white' />
                  </TouchableOpacity>
                  <Text style={styles.title}>Chi tiết đơn hàng</Text>
                </View>
              )
            }}
          />
          <Stack.Screen
            name='orderCheck'
            options={{
              title: 'Kiểm tra đơn hàng', // Tiêu đề màn hình
              animation: 'fade',
              header: () => (
                <View style={styles.customHeader2}>
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                  >
                    <SvgIcon Icon={LeftArrow} color='#686868' />
                  </TouchableOpacity>
                  <Text style={[styles.title, { color: '#1A1A1A' }]}>
                    Kiểm tra đơn hàng
                  </Text>
                </View>
              )
            }}
          />
        </Stack>
      </ThemeProvider>
    </OrderProvider>
  )
}

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3DB95B',
    paddingHorizontal: 10,
    paddingTop: 40
  },
  backButton: {
    padding: 5
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16
  },
  customHeader2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 32,
    paddingBottom: 16,
    elevation: 3
  }
})
