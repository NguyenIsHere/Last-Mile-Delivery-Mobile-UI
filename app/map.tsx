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
const Driving = require('../assets/images/delivery-man.jpg')
const Driver = require('../assets/images/home-icon-Assistant.png')

import BookmarkIcon from '../assets/icons/bookmark.svg'
import LeftArrow from '../assets/icons/angle-small-left.svg'
import RightArrow from '../assets/icons/angle-small-right.svg'
import DownArrow from '../assets/icons/angle-down.svg'
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

export default function map () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng
  const { orderInfo, updateOrderInfo } = useOrderContext()

  const [currentSlideValue, setCurrentSlideValue] = useState(screenHeight - 240)

  const initialHeight = screenHeight - 240 // Chiều cao ban đầu
  const expandedHeight = 60 // Chiều cao mở rộng

  const slideAnim = useRef(new Animated.Value(initialHeight)).current // Vị trí ban đầu
  const slideValueRef = useRef(initialHeight) // Lưu giá trị hiện tại

  useEffect(() => {
    const listener = slideAnim.addListener(({ value }) => {
      setCurrentSlideValue(value)
      slideValueRef.current = value // Cập nhật giá trị tạm ngay lập tức
    })

    return () => {
      slideAnim.removeListener(listener)
    }
  }, [slideAnim])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy < 0, // Chỉ cho phép kéo lên
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(
          expandedHeight,
          Math.min(initialHeight, slideValueRef.current + gestureState.dy)
        )
        slideAnim.setValue(newPosition)
      },
      onPanResponderRelease: (_, gestureState) => {
        const isDraggingDown = gestureState.dy > 50
        const toValue = isDraggingDown ? initialHeight : expandedHeight

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
              toValue:
                slideValueRef.current === expandedHeight
                  ? initialHeight
                  : expandedHeight,
              useNativeDriver: false
            }).start(() => {
              setCurrentSlideValue(
                slideValueRef.current === expandedHeight
                  ? initialHeight
                  : expandedHeight
              )
            })
          }
        >
          <View style={styles.toggleButton}>
            {slideValueRef.current === expandedHeight ? (
              <SvgIcon Icon={DownArrow} size={20} />
            ) : (
              <View style={styles.handle} />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.menuContent}>
          <View style={styles.deliveryState}>
            <View style={[styles.deliveryTopState]}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>11:18 PM</Text>
                <Text style={styles.subText}>Đang giao hàng</Text>
              </View>
              <Image
                source={Driving}
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: -20
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
                source={Driver}
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
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
              <TouchableOpacity
                style={styles.contactIconContainer}
                onPress={() => router.push('/')}
              ></TouchableOpacity>
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
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: color.fontColor100
                  }}
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
                    marginBottom: 10,
                    paddingRight: 20,
                    fontFamily: 'Quicksand-Medium'
                  }}
                  numberOfLines={2}
                >
                  Cách Mạng Tháng 8, P.10, Q.3, Hồ Chí Minh, 70000, Vietnam
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
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: color.fontColor100
                  }}
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
                    marginBottom: 10,
                    paddingRight: 20,
                    fontFamily: 'Quicksand-Medium'
                  }}
                  numberOfLines={2}
                >
                  Nguyễn Trãi, P.Nguyễn Cư Trinh, Q.1, Hồ Chí Minh, 70000,
                  Vietnam
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
                      fontFamily: 'Quicksand-Bold',
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
    height: screenHeight - 50, // Chiều cao tối đa của menu
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5
  },

  menuContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
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
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },

  subText: {
    color: color.fontColor60,

    fontFamily: 'Quicksand-Medium'
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
    marginBottom: 20,
    marginTop: 10
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
    marginBottom: 4,
    boxSizing: 'border-box'
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
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 20
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: color.fontColor30,
    borderRadius: 3,
    alignSelf: 'center'
  }
})
