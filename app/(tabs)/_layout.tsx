import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { Text } from '@/components/Themed'

import HomeIcon from '../../assets/icons/house-window.svg'
import HomeIconFill from '../../assets/icons/house-window-fill.svg'

import RectangleListIcon from '../../assets/icons/rectangle-list.svg'
import RectangleListIconFill from '../../assets/icons/rectangle-list-fill.svg'

import MeetingIcon from '../../assets/icons/meeting.svg'
import MeetingIconFill from '../../assets/icons/meeting-fill.svg'

import SettingsIcon from '../../assets/icons/settings.svg'
import SettingsIconFill from '../../assets/icons/settings-fill.svg'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof HomeIcon>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

export default function TabLayout () {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon Icon={focused ? HomeIconFill : HomeIcon} color={color} />
          ),
          header: () => null
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon
              Icon={focused ? RectangleListIconFill : RectangleListIcon}
              color={color}
            />
          ),
          header: () => null
        }}
      />
      <Tabs.Screen
        name='three'
        options={{
          title: 'Cộng đồng',
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon
              Icon={focused ? MeetingIconFill : MeetingIcon}
              color={color}
            />
          ),
          header: () => null
        }}
      />
      <Tabs.Screen
        name='four'
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color, focused }) => (
            <SvgIcon
              Icon={focused ? SettingsIconFill : SettingsIcon}
              color={color}
            />
          ),
          header: () => null
        }}
      />
    </Tabs>
  )
}
