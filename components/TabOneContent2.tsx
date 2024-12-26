import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useOrderContext } from '../context/orderContext'

const MotorIcon = require('../assets/pngicons/Bike_36x36.png')
const TruckIcon = require('../assets/pngicons/BoxTruck_36x36.png')
const VanIcon = require('../assets/pngicons/Van_36x36.png')

const CheapIcon = require('../assets/pngicons/SameDay_36x36.png')
const FastIcon = require('../assets/pngicons/Instant_36x36.png')
const WalletIcon = require('../assets/pngicons/UpfrontBatchV2_36x36.png')

import SearchIcon from '../assets/icons/search.svg'
import CouponIcon from '../assets/icons/ticket.svg'
import BellIcon from '../assets/icons/bell.svg'

import Round from '../assets/icons/dot-circle.svg'
import { SafeAreaView } from 'react-native-safe-area-context'

const avatar = require('../assets/images/Mei.png')
const banner = require('../assets/images/banner3.png')

const screenWidth = Dimensions.get('window').width

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
  Icon: React.FC<React.ComponentProps<typeof SearchIcon>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

function ButtonIconSvg ({
  Icon,
  label
}: {
  Icon: React.FC<React.ComponentProps<typeof SearchIcon>>
  label: string
}) {
  return (
    <TouchableOpacity style={styles.button}>
      <SvgIcon Icon={Icon} size={24} color='#444' />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default function FullWidthScrollView () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng

  const [deliveryOptionsVisible, setDeliveryOptionsVisible] = useState(false)
  const [vehicleOptionsVisible, setVehicleOptionsVisible] = useState(false)

  const [deliveryOption, setDeliveryOption] = useState('')
  const [vehicleOption, setVehicleOption] = useState('')

  const { orderInfo, updateOrderInfo } = useOrderContext()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
        contentContainerStyle={[styles.scrollView]}
      >
        {/* Background */}
        <View style={styles.header}></View>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Image source={avatar} style={styles.image} />
            <View>
              <Text style={styles.headerText}>Trần Khôi Nguyên</Text>
              <Text style={styles.headerText}>Liên kết Viettel++</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <SvgIcon Icon={SearchIcon} size={20} color='#FDFDFF' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/orderDetail')}>
              <SvgIcon Icon={CouponIcon} size={20} color='#FDFDFF' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/multiDestinations')}>
              <SvgIcon Icon={BellIcon} size={20} color='#FDFDFF' />
            </TouchableOpacity>
          </View>
        </View>

        {/* Địa chỉ */}
        <View style={styles.addressContainer}>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <SvgIcon Icon={Round} size={12} color='#3282B9' />
              <Text
                style={[
                  orderInfo.senderIn4.address
                    ? { color: '#202020' }
                    : { color: '#727272' },
                  {
                    fontFamily: 'Quicksand-Medium'
                  }
                ]}
                numberOfLines={1}
                ellipsizeMode='tail' // tail | middle | head | clip
              >
                {orderInfo.senderIn4.address || 'Lấy hàng ở đâu?'}
              </Text>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: 16,
                  height: '100%',
                  right: 0
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <View style={styles.dots}>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.orderContent, { marginBottom: -8 }]}
              onPress={() => router.push('/addressInput')}
            >
              <SvgIcon Icon={Round} size={12} color='#F75536' />
              <Text
                style={[
                  orderInfo.receiverIn4.address
                    ? { color: '#202020' }
                    : { color: '#727272' },
                  {
                    fontFamily: 'Quicksand-Medium'
                  }
                ]}
                numberOfLines={1}
                ellipsizeMode='tail' // tail | middle | head | clip
              >
                {orderInfo.receiverIn4.address || 'Giao đến đâu?'}
              </Text>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: 16,
                  height: '100%',
                  right: 0
                }}
              />
            </TouchableOpacity>
            {orderInfo.receiverIn4.address && (
              <TouchableOpacity
                style={[styles.orderContent, { marginBottom: -10 }]}
                onPress={() => router.push('/addressInput')}
              >
                <View style={styles.dots}></View>
                <Text
                  style={{
                    color: '#1B6DC5',
                    marginTop: 16,
                    fontFamily: 'Quicksand-Bold'
                  }}
                >
                  + Thêm điểm giao
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Đơn hàng đã lưu */}
        <View style={styles.savedOrderGroup}>
          <Text style={styles.titleText}>Đơn hàng đã lưu</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
            style={styles.savedOrderHorizontalList}
          >
            <View style={styles.orderListContainer}>
              <TouchableOpacity
                style={styles.savedOrderItem}
                onPress={() => router.push('/orderDetail')}
              >
                <View style={styles.orderContent}>
                  <SvgIcon Icon={Round} size={12} color='#F75536' />
                  <Text style={styles.boldText}>Nguyễn Văn A</Text>
                  <Text style={styles.normalText}>
                    • 56/34 Hai Ba Trung St.
                  </Text>
                </View>
                <View style={styles.dots2}>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                </View>
                <View style={styles.orderContent}>
                  <SvgIcon Icon={Round} size={12} color='#3282B9' />
                  <Text style={styles.boldText}>Trần Văn B</Text>
                  <Text style={styles.normalText}>• Di An High School</Text>
                </View>
                <View style={styles.orderService}>
                  <PngIcon name={MotorIcon} size={24} />
                  <Text style={styles.blackText}>Instant</Text>
                  <PngIcon name={CheapIcon} size={24} />
                  <Text style={styles.blackText}>S • 1kg</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savedOrderItem}
                onPress={() => router.push('/orderDetail')}
              >
                <View style={styles.orderContent}>
                  <SvgIcon Icon={Round} size={12} color='#F75536' />
                  <Text style={styles.boldText}>Nguyễn Văn A</Text>
                  <Text style={styles.normalText}>
                    • 56/34 Hai Ba Trung St.
                  </Text>
                </View>
                <View style={styles.dots2}>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                </View>
                <View style={styles.orderContent}>
                  <SvgIcon Icon={Round} size={12} color='#3282B9' />
                  <Text style={styles.boldText}>Trần Văn B</Text>
                  <Text style={styles.normalText}>• Di An High School</Text>
                </View>
                <View style={styles.orderService}>
                  <PngIcon name={FastIcon} size={24} />
                  <Text style={styles.blackText}>Instant</Text>
                  <PngIcon name={TruckIcon} size={24} />
                  <Text style={styles.blackText}>S • 1kg</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Banner quảng cáo */}
        <Text style={styles.titleText}>Khám phá ưu đãi ngay</Text>
        <View>
          <Image source={banner} style={styles.banner} resizeMode='cover' />
        </View>

        <Text style={styles.titleText}>Tin tức và khám phá</Text>
        {/* Banner quảng cáo */}
        <View>
          <Image source={banner} style={styles.banner} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFD'
  },

  scrollView: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFD',
    padding: 16
  },
  headerText: {
    color: '#FDFDFF',
    fontFamily: 'Quicksand-Medium'
  },
  header: {
    position: 'absolute',
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    height: 140,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#3DB95B'
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50
  },
  banner: {
    height: 140,
    borderRadius: 15,
    width: '100%'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  },
  button: {
    width: '22%',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#FFFFFF'
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'Quicksand-Medium'
  },
  addressContainer: {
    display: 'flex',
    height: 'auto',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#FDFDFF',
    elevation: 5,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  button2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: -5,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  buttonText2: {
    marginLeft: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#444',
    fontFamily: 'Quicksand-SemiBold'
  },
  titleText: {
    fontSize: 20,
    color: '#444',
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Quicksand-Bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%'
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 20
  },
  optionButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    padding: 10,
    backgroundColor: '#ffffff',
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  selectedOptionButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#03B151'
  },
  optionContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 4
  },
  optionTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionTitle: {
    fontSize: 14,
    fontFamily: 'Quicksand-Bold'
  },
  optionText: {
    color: 'gray',
    fontSize: 14
  },
  optionTextAlert: {
    color: '#E27265',
    fontSize: 14
  },
  submitButton: {
    backgroundColor: '#03B151',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    width: '100%'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold'
  },
  savedOrderGroup: {
    marginBottom: 20
  },
  savedOrderHorizontalList: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  orderListContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16
  },
  savedOrderItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#727272',
    width: screenWidth - 32
  },
  orderContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
    paddingHorizontal: 4
  },
  boldText: {
    fontFamily: 'Quicksand-Bold'
  },
  normalText: {
    color: '#727272',
    fontFamily: 'Quicksand-Medium'
  },
  dots: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 12,
    gap: 4
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ccc'
  },
  dots2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 12,
    gap: 4,
    margin: 4
  },
  orderService: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 4,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    gap: 8
  },
  blackText: {
    color: 'black',
    fontFamily: 'Quicksand-Medium'
  }
})
