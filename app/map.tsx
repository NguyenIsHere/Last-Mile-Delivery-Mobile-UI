import React, { useEffect, useRef, useState } from 'react'
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
  TouchableWithoutFeedback,
  Animated,
  PanResponder
} from 'react-native'
import color from '../constants/color'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useOrderContext } from '../context/orderContext'

const PackageIcon = require('../assets/pngicons/013-on-time.png')
const MotorIcon = require('../assets/pngicons/Bike_36x36.png')
const TruckIcon = require('../assets/pngicons/BoxTruck_36x36.png')
const VanIcon = require('../assets/pngicons/Van_36x36.png')

const CheapIcon = require('../assets/pngicons/SameDay_36x36.png')
const FastIcon = require('../assets/pngicons/Instant_36x36.png')
const WalletIcon = require('../assets/pngicons/UpfrontBatchV2_36x36.png')

const DetailBoxIcon = require('../assets/pngicons/012-weight-scale.png')
const VoucherIcon = require('../assets/pngicons/019-pennant.png')

const MapBG = require('../assets/images/BigMap.png')
const DrivingGif = require('../assets/images/driving.gif')

import BookmarkIcon from '../assets/icons/bookmark.svg'
import LeftArrow from '../assets/icons/angle-small-left.svg'
import RightArrow from '../assets/icons/angle-small-right.svg'
import Round from '../assets/icons/dot-circle (1).svg'
import Destination from '../assets/icons/marker copy.svg'
import Plus from '../assets/icons/plus.svg'

import MomoIcon from '../assets/icons/momo.svg'

import CallIcon from '../assets/icons/phone-flip.svg'
import ChatIcon from '../assets/icons/messages.svg'
import BikeIcon from '../assets/icons/motorcycle.svg'
import PickUpIcon from '../assets/icons/screen-share.svg'
import DropOffIcon from '../assets/icons/laptop-arrow-down.svg'
import MapWriteIcon from '../assets/icons/map-marker.svg'
import CopyIcon from '../assets/icons/copy.svg'

import Svg from 'react-native-svg'
import { SafeAreaView } from 'react-native-safe-area-context'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function PngIcon ({
  name,
  size = 32
}: {
  name: ImageSourcePropType // Dùng const đã khai báo
  size?: number
}) {
  return (
    <Image
      source={name}
      style={{
        width: size,
        height: size,
        marginTop: 3,
        backgroundColor: 'white'
      }}
    />
  )
}

function SvgIcon ({
  Icon,
  size = 24,
  Color = color.fontColor30
}: {
  Icon: React.FC<React.ComponentProps<typeof BookmarkIcon>>
  size?: number
  Color?: string
}) {
  return <Icon width={size} height={size} fill={Color} />
}

export default function Map () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng
  const { orderInfo, updateOrderInfo } = useOrderContext()

  const slideAnim = useRef(new Animated.Value(screenHeight - 200)).current // Vị trí ban đầu của menu

  const slideValueRef = useRef(screenHeight - 200) // Lưu giá trị hiện tại của slideAnim
  useEffect(() => {
    const listener = slideAnim.addListener(({ value }) => {
      setCurrentSlideValue(value) // Cập nhật state
      slideValueRef.current = value // Cập nhật giá trị tạm ngay lập tức
    })

    return () => {
      slideAnim.removeListener(listener) // Xóa listener khi component unmount
    }
  }, [slideAnim])

  const [currentSlideValue, setCurrentSlideValue] = useState(screenHeight - 200)

  // PanResponder để kéo menu
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy < 0, // Chỉ cho phép kéo lên (dy < 0)

      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(
          screenHeight - 400,
          Math.min(screenHeight - 100, slideValueRef.current + gestureState.dy)
        )
        slideAnim.setValue(newPosition) // Cập nhật vị trí trực tiếp
      },

      onPanResponderRelease: (_, gestureState) => {
        const isDraggingDown = gestureState.dy > 50

        const toValue = isDraggingDown
          ? screenHeight - 200 // Không cho phép kéo xuống
          : 100 // Chỉ cho phép mở rộng

        Animated.spring(slideAnim, {
          toValue,
          useNativeDriver: false
        }).start(() => {
          setCurrentSlideValue(toValue)
        })
      }
    })
  ).current

  return (
    <SafeAreaView>
      {/* Hình nền */}
      <Image source={MapBG} style={styles.backgroundImage} resizeMode='cover' />

      {/* Menu */}
      <Animated.View
        style={[
          styles.menuContainer,
          {
            top: slideAnim // Điều khiển vị trí của menu
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={() =>
            Animated.spring(slideAnim, {
              toValue: slideValueRef.current === 100 ? screenHeight - 200 : 100, // Toggle
              useNativeDriver: false
            }).start(() => {
              setCurrentSlideValue(
                slideValueRef.current === 100 ? screenHeight - 200 : 100
              )
            })
          }
        >
          <Text style={styles.toggleButton}>
            {slideValueRef.current === 100 ? (
              <View style={{ transform: [{ rotate: '90deg' }] }}>
                <SvgIcon Icon={RightArrow} size={20} />
              </View>
            ) : (
              <View style={styles.handle} />
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.menuContent}>
          <View style={styles.deliveryState}>
            <View style={styles.deliveryTopState}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>11:18 PM</Text>
                <Text style={styles.subText}>Đang giao hàng</Text>
              </View>
              <Image
                source={DrivingGif}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                resizeMode='center'
              ></Image>
            </View>

            <View style={styles.deliveryBottomState}>
              <View style={styles.lineContainer}>
                <SvgIcon Icon={BikeIcon} size={16} Color={color.mainColor100} />
                <View
                  style={[styles.line, { backgroundColor: color.mainColor100 }]}
                ></View>
                <SvgIcon
                  Icon={PickUpIcon}
                  size={16}
                  Color={color.mainColor100}
                />
                <View
                  style={[styles.line, { backgroundColor: color.mainColor100 }]}
                ></View>
                <SvgIcon Icon={DropOffIcon} size={16} />
              </View>
            </View>
          </View>

          <View style={styles.driverInfo}>
            <View style={styles.driver}>
              <Image
                source={DrivingGif}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                resizeMode='center'
              ></Image>
              <View style={styles.textContainer}>
                <Text style={styles.text}>5.0⭐</Text>
                <Text style={styles.subText}>Yamaha Exciter</Text>
              </View>
            </View>
            <View style={styles.contact}>
              <View
                style={[
                  styles.contactIconContainer,
                  { transform: [{ scaleX: -1 }] }
                ]}
              >
                <SvgIcon Icon={CallIcon} size={24} />
              </View>
              <View
                style={{
                  height: '100%',
                  width: 2,
                  backgroundColor: color.whiteColor50
                }}
              ></View>
              <View style={styles.contactIconContainer}>
                <SvgIcon Icon={ChatIcon} size={24} />
              </View>
            </View>
          </View>
          <View style={styles.orderInfo}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/addressInput')}
              >
                <SvgIcon Icon={Round} size={12} Color={color.blueColor100} />
                <Text
                  style={
                    orderInfo.senderIn4.address
                      ? { fontWeight: 'bold', color: color.fontColor100 }
                      : { color: '#6B6B6B' }
                  }
                  numberOfLines={1}
                >
                  {orderInfo.senderIn4.address || 'Lấy hàng ở đâu?'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/senderInfo')}
              >
                <View style={styles.dots}>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                </View>
                <Text
                  style={{
                    color: color.fontColor60,
                    marginBottom: 10
                  }}
                  numberOfLines={2}
                >
                  Thêm thông tin người gửi Thêm thông tin người gửi Thêm thông
                  tin người gửi Thêm thông tin người gửi Thêm thông tin người
                  gửi Thêm thông tin người gửi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/addressInput')}
              >
                <SvgIcon
                  Icon={Destination}
                  size={12}
                  Color={color.orangeColor100}
                />
                <Text
                  style={{ fontWeight: 'bold', color: color.fontColor100 }}
                  numberOfLines={1}
                >
                  {orderInfo.receiverIn4.address || 'Giao đến đâu?'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/receiverInfo')}
              >
                <View style={[styles.dots, { opacity: 0 }]}>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                </View>
                <Text
                  style={{
                    color: color.fontColor60,
                    marginBottom: 10
                  }}
                  numberOfLines={2}
                >
                  Thêm thông tin người nhận Thêm thông tin người nhận Thêm thông
                  tin người nhận Thêm thông tin người nhận Thêm thông tin người
                  nhận
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginLeft: 36,
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5
                  }}
                >
                  <SvgIcon
                    Icon={MapWriteIcon}
                    size={16}
                    Color={color.blueColor90}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: color.blueColor90
                    }}
                    numberOfLines={1}
                  >
                    Thêm chỉ dẫn
                  </Text>
                </View>

                <SvgIcon Icon={RightArrow} size={16} />
              </View>
            </View>
          </View>
          <View style={styles.codeInfo}>
            <Text style={styles.text}>IN-2-00CM00T4EADH</Text>
            <SvgIcon Icon={CopyIcon} size={16} />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD'
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight
  },
  menuContainer: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight - 100, // Chiều cao tối đa của menu
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: color.fontColor30,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10
  },
  menuContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },

  deliveryState: {
    width: '100%',
    marginBottom: 10
  },
  deliveryTopState: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    boxSizing: 'border-box'
  },
  deliveryBottomState: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },

  textContainer: {
    justifyContent: 'center'
  },

  text: {
    color: color.fontColor100,
    fontWeight: 'bold',
    fontSize: 16
  },

  subText: {
    color: color.fontColor60
  },

  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },

  line: {
    width: '30%',
    height: 2,
    backgroundColor: color.whiteColor50
  },

  driverInfo: {
    width: '100%',
    marginBottom: 20
  },

  driver: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20
  },

  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: color.whiteColor50,
    borderTopWidth: 1,
    paddingVertical: 10
  },

  contactIconContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  orderInfo: {
    width: '100%',
    padding: 20,
    borderBottomColor: color.whiteColor50,
    borderBottomWidth: 2
  },

  orderContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
    marginBottom: 4
    // backgroundColor: color.whiteColor50
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

  codeInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  toggleButton: {
    fontSize: 16,
    color: '#03B151',
    textAlign: 'center',
    marginTop: 10
  }
})
