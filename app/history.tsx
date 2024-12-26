import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ImageSourcePropType
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  FontAwesome,
  FontAwesome6,
  EvilIcons,
  AntDesign
} from '@expo/vector-icons'
import {
  useFonts,
  Quicksand_500Medium,
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand'
import * as SplashScreen from 'expo-splash-screen'
const empty = require('../assets/images/Picture1.png')
const driving = require('../assets/images/Picture2.png')

const MotorIcon = require('../assets/pngicons/Bike_36x36.png')
const TruckIcon = require('../assets/pngicons/BoxTruck_36x36.png')
const VanIcon = require('../assets/pngicons/Van_36x36.png')

const CheapIcon = require('../assets/pngicons/SameDay_36x36.png')
const FastIcon = require('../assets/pngicons/Instant_36x36.png')
const WalletIcon = require('../assets/pngicons/UpfrontBatchV2_36x36.png')

import Round from '../assets/icons/dot-circle.svg'

function PngIcon ({
  name,
  size = 32
}: {
  name: ImageSourcePropType // Dùng const đã khai báo
  size?: number
}) {
  return (
    <Image source={name} style={{ width: size, height: size, marginTop: 3 }} />
  )
}

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof Round>>
  size?: number
  color?: string
}) {
  return (
    <Icon width={size} height={size} fill={color} style={{ marginTop: 4 }} />
  )
}

interface Order {
  id: string
  sender: string
  sender_address: string
  receiver: string
  receiver_address: string
  vehicleType: string
  packageSize: string
}

interface TabButtonProps {
  title: string
  isActive: boolean
  onPress: () => void
}

interface OrderItemProps {
  order: Order
  onDelete: (id: string) => void
}

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<'saved' | 'history' | 'current'>(
    'saved'
  )
  const [searchQuery, setSearchQuery] = useState<string>('')

  const savedOrders: Order[] = [
    {
      id: '1',
      sender: 'Trần Khôi Nguyên • ',
      sender_address: 'Nhà',
      receiver: '3 người nhận',
      receiver_address: '',
      vehicleType: 'Instant',
      packageSize: 'S • 1kg'
    },
    {
      id: '2',
      sender: 'Trần Khôi Nguyên • ',
      sender_address: '77/54 Phan Đăng Lưu, P.7, Q. Phú Nhuận',
      receiver: 'Hoàng Minh Nhật • ',
      receiver_address: '9/12 Nguyễn Thị Minh Khai, P.6, Q.3',
      vehicleType: 'Instant',
      packageSize: 'S • 1kg'
    }
  ]

  const TabButton: React.FC<TabButtonProps> = ({
    title,
    isActive,
    onPress
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, isActive && styles.activeTabButton]}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )

  const EmptyState: React.FC = () => (
    <View style={styles.emptyStateContainer}>
      <Image source={empty} style={styles.emptyStateImage} />
      <Text style={styles.emptyStateTextTitle}>
        Bạn chưa đặt đơn giao hàng nào
      </Text>
      <Text style={styles.emptyStateText}>
        Hãy quay lại kiểm tra sau khi đơn giao đầu tiên hoàn tất nhé
      </Text>
      <TouchableOpacity style={styles.createOrderButton}>
        <Text style={styles.createOrderButtonText}>Bắt đầu đặt giao đơn</Text>
      </TouchableOpacity>
    </View>
  )

  const EmptyState2: React.FC = () => (
    <View style={styles.emptyStateContainer}>
      <Image source={driving} style={styles.emptyStateImage} />
      <Text style={styles.emptyStateTextTitle}>
        Không có đơn hàng nào đang được xử lý
      </Text>
      <Text style={styles.emptyStateText}>
        Sau khi đặt giao đơn, bạn có thể theo dõi trạng thái đơn hàng ở đây
      </Text>
      <TouchableOpacity style={styles.createOrderButton}>
        <Text style={styles.createOrderButtonText}>Bắt đầu đặt giao đơn</Text>
      </TouchableOpacity>
    </View>
  )

  const OrderItem: React.FC<OrderItemProps> = ({ order, onDelete }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderLine}>
        <SvgIcon Icon={Round} size={16} color='#206CC2' />
        <Text style={styles.orderText} numberOfLines={1} ellipsizeMode='tail'>
          {order.sender}
          <Text
            style={styles.orderTextSub}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {order.sender_address}
          </Text>
        </Text>
      </View>
      <View style={styles.orderLine}>
        <SvgIcon Icon={Round} size={16} color='#ED5D4C' />
        <Text style={styles.orderText} numberOfLines={1} ellipsizeMode='tail'>
          {order.receiver}
          <Text
            style={styles.orderTextSub}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {order.receiver_address}
          </Text>
        </Text>
      </View>
      <View style={styles.orderLastLine}>
        <View style={styles.orderInfo}>
          <PngIcon name={MotorIcon} size={20} />
          <Text style={styles.orderInfoText}>{order.vehicleType}</Text>
        </View>
        <View style={styles.orderInfo}>
          <PngIcon name={CheapIcon} size={20} />
          <Text style={styles.orderInfoText}>{order.packageSize}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(order.id)}
        >
          <FontAwesome6 name='trash-can' size={20} color='#206CC2' />
        </TouchableOpacity>
      </View>
    </View>
  )

  // Load the font
  const [fontsLoaded] = useFonts({
    Quicksand_500Medium,
    Quicksand_700Bold
  })

  // Hide splash screen when fonts are loaded
  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  // Show nothing while fonts are loading
  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TabButton
          title='Đã lưu'
          isActive={activeTab === 'saved'}
          onPress={() => setActiveTab('saved')}
        />
        <TabButton
          title='Lịch sử'
          isActive={activeTab === 'history'}
          onPress={() => setActiveTab('history')}
        />
        <TabButton
          title='Hiện tại'
          isActive={activeTab === 'current'}
          onPress={() => setActiveTab('current')}
        />
      </View>

      {activeTab === 'saved' ? (
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <FontAwesome name='search' size={14} color='#4b4b4b' />
            <TextInput
              style={styles.searchInput}
              placeholder='Tìm theo tên, địa chỉ, số điện thoại'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <AntDesign name='closecircle' size={14} color='#666666' />
          </View>
          <ScrollView style={styles.ordersList}>
            {savedOrders.map(order => (
              <OrderItem
                key={order.id}
                order={order}
                onDelete={id => console.log('Delete order:', id)}
              />
            ))}
          </ScrollView>
        </View>
      ) : activeTab === 'history' ? (
        <EmptyState />
      ) : (
        <EmptyState2 />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
    fontFamily: 'Quicksand-Medium'
  },
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontFamily: 'Quicksand-Medium'
  },
  backButton: {
    padding: 8
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#15BF61',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20,
    fontFamily: 'Quicksand-Medium',
    elevation: 1
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontFamily: 'Quicksand-Medium'
  },
  activeTabButton: {
    backgroundColor: '#027F4A',
    fontFamily: 'Quicksand-Medium'
  },
  tabButtonText: {
    fontSize: 16,
    color: '#027F4A',
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 2
  },
  activeTabButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 2
  },
  content: {
    flex: 1,
    padding: 16
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium'
  },
  ordersList: {
    flex: 1
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DEE7F3'
  },
  orderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8
  },
  orderLastLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderText: {
    color: '#4B4B4B',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    paddingRight: 10,
    paddingLeft: 10
  },
  orderTextSub: {
    color: '#666666',
    fontWeight: '400',
    fontFamily: 'Quicksand-Medium',
    fontSize: 16
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 4,
    fontFamily: 'Quicksand-Medium'
  },
  orderInfoText: {
    color: '#4B4B4B',
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    paddingLeft: 10
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: 8,
    fontFamily: 'Quicksand-Medium',
    fontSize: 16
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 24
  },

  emptyStateTextTitle: {
    fontSize: 16,
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Quicksand-Bold'
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Quicksand-Medium'
  },
  createOrderButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  createOrderButtonText: {
    color: '#206CC2',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  }
})

export default OrdersScreen
