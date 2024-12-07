import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import Octicons from '@expo/vector-icons/Octicons'

const screenWidth = Dimensions.get('window').width

// Component Icon cho phần Header
function HeaderIcon (props: {
  name: React.ComponentProps<typeof Octicons>['name']
  color: string
}) {
  return <Octicons size={24} {...props} />
}

export default function TabTwoContent () {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send') // Quản lý tab Đơn gửi/Đơn nhận
  const [subTab, setSubTab] = useState<'normal' | 'express' | 'ecommerce'>(
    'normal'
  ) // Quản lý tab con trong Đơn gửi

  const renderSendContent = () => {
    return (
      <View>
        <View style={styles.subTabContainer}>
          <TabButton
            label='Đơn thường'
            isActive={subTab === 'normal'}
            onPress={() => setSubTab('normal')}
            style={{
              // Đổi style khi tab này được nhấn
              borderRadius: 0,
              width: screenWidth / 3,
              borderBottomWidth: subTab === 'normal' ? 3 : 0, // Thêm border dưới khi active
              borderColor: '#F10033' // Màu đỏ cho border dưới
            }}
          />
          <View style={styles.subTabDivider}></View>
          <TabButton
            label='Đơn giao ngay'
            isActive={subTab === 'express'}
            onPress={() => setSubTab('express')}
            style={{
              // Đổi style khi tab này được nhấn
              borderRadius: 0, // Bỏ border-radius
              width: screenWidth / 3,
              borderBottomWidth: subTab === 'express' ? 3 : 0, // Thêm border dưới khi active
              borderColor: '#F10033' // Màu đỏ cho border dưới
            }}
          />
          <View style={styles.subTabDivider}></View>
          <TabButton
            label='Đơn sàn TMĐT'
            isActive={subTab === 'ecommerce'}
            onPress={() => setSubTab('ecommerce')}
            style={{
              // Đổi style khi tab này được nhấn
              borderRadius: 0, // Bỏ border-radius
              width: screenWidth / 3,
              borderBottomWidth: subTab === 'ecommerce' ? 3 : 0, // Thêm border dưới khi active
              borderColor: '#F10033' // Màu đỏ cho border dưới
            }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.text}>
            Nội dung:{' '}
            {subTab === 'normal'
              ? 'Đơn thường'
              : subTab === 'express'
              ? 'Đơn giao ngay'
              : 'Đơn sàn TMĐT'}
          </Text>
        </ScrollView>
      </View>
    )
  }

  const renderReceiveContent = () => {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Nội dung: Đơn nhận</Text>
      </ScrollView>
    )
  }

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tabMenu}>
          <TabButton
            label='Đơn gửi'
            isActive={activeTab === 'send'}
            onPress={() => setActiveTab('send')}
            isMainTab={true} // Tab chính, Đơn gửi
          />
          <TabButton
            label='Đơn nhận'
            isActive={activeTab === 'receive'}
            onPress={() => setActiveTab('receive')}
            isMainTab={true} // Tab chính, Đơn nhận
          />
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <HeaderIcon name='search' color='#FDFDFF' />
        </TouchableOpacity>
      </View>
      {/* Nội dung */}
      {activeTab === 'send' ? renderSendContent() : renderReceiveContent()}
    </View>
  )
}

function TabButton ({
  label,
  isActive,
  onPress,
  isMainTab = false, // Đánh dấu tab chính hay tab con
  style // style tùy chọn, có thể null hoặc undefined
}: {
  label: string
  isActive: boolean
  onPress: () => void
  isMainTab?: boolean // Nếu là tab chính thì có màu khác
  style?: any
}) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.tabButtonActive, style]} // Áp dụng style nhận vào
      onPress={onPress}
    >
      <Text
        style={[
          styles.tabButtonText,
          {
            color: isActive
              ? '#F10033' // Màu đỏ khi active
              : isMainTab
              ? '#fff' // Màu trắng cho tab chính không active
              : '#000' // Màu đen cho tab con không active
          }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    overflow: 'hidden',
    paddingBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F10033'
  },
  searchIcon: {
    position: 'absolute',
    right: 20
  },
  tabMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#CE012C'
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5
  },
  tabButtonActive: {
    backgroundColor: '#FFF'
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center'
  },
  tabButtonTextActive: {
    color: '#F10033',
    fontFamily: 'Quicksand-Bold'
  },
  subTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  content: {
    padding: 20
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Quicksand-Medium'
  },
  subTabDivider: {
    width: 2,
    alignSelf: 'center',
    height: 15,
    backgroundColor: '#CCCCCC'
  }
})
