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
  PanResponder,
  TextInput
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
import MenuDot from '../assets/icons/menu-dots-vertical (1).svg'
import NavigationIcon from '../assets/icons/navigation.svg'

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
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors'

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

export default function chooseFromMap () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng
  const { orderInfo, updateOrderInfo } = useOrderContext()

  const [currentSlideValue, setCurrentSlideValue] = useState(screenHeight - 250)

  const initialHeight = screenHeight - 250 // Chiều cao ban đầu
  const expandedHeight = 200 // Chiều cao mở rộng

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
    <>
      <View style={styles.customHeader3}>
        <TouchableOpacity
          style={styles.BackIconContainer}
          onPress={router.back}
        >
          <SvgIcon Icon={LeftArrow} size={24} />
        </TouchableOpacity>
        <View style={styles.SearchInputContainer}>
          <SvgIcon Icon={Round} size={16} Color={color.orangeColor100} />
          <TextInput
            style={styles.SearchInput}
            placeholder='Giao đến đâu'
            placeholderTextColor={color.fontColor30}
          />
        </View>
      </View>

      <SafeAreaView>
        {/* Hình nền */}

        <Image
          source={MapBG}
          style={styles.backgroundImage}
          resizeMode='cover'
        />

        {/* Menu */}
        <Animated.View
          style={[
            styles.menuContainer,
            {
              top: slideAnim, // Điều khiển vị trí của menu
              zIndex: 1
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
              <View style={[styles.deliveryTopState, { marginTop: 10 }]}>
                <View style={styles.textContainer}>
                  <Text style={[styles.text]} numberOfLines={1}>
                    Trường Đại Học Công Nghệ Thông Tin TP.Hồ Chí Minh
                  </Text>
                  <Text style={[styles.subText]} numberOfLines={1}>
                    Hàn Thuyên, KP.6, P.Linh Trung, Tp.Thủ Đức, Hồ Chí Minh
                  </Text>
                </View>
                <SvgIcon Icon={MenuDot} size={12} Color={'#4B4B4B'} />
              </View>

              <View style={[styles.deliveryTopState]}>
                <View style={styles.textContainer2}>
                  <SvgIcon Icon={NavigationIcon} size={32} Color={'#027F4A'} />
                  <Text
                    style={[styles.text, { paddingBottom: 3 }]}
                    numberOfLines={1}
                  >
                    Cổng Đón/Trả Khách
                  </Text>
                </View>
                <SvgIcon Icon={MenuDot} size={12} Color={'#4B4B4B'} />
              </View>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
      <View style={styles.selectDestinationBtnContainer}>
        <TouchableOpacity
          style={styles.selectDestinationBtn}
          onPress={router.back}
        >
          <Text style={styles.selectDestinationBtnText}>Chọn điểm đến này</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD'
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0
  },
  menuContainer: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight - 100, // Chiều cao tối đa của menu
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    zIndex: 1
  },

  menuContent: {
    flex: 1,
    width: '100%',
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

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },

  textContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },

  text: {
    color: color.fontColor100,
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },

  subText: {
    color: color.fontColor60,
    fontSize: 14,
    fontFamily: 'Quicksand-Medium'
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
  },
  selectDestinationBtnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 10, // Higher than the animated view
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: 0.75,
    borderTopColor: color.whiteColor30
  },

  selectDestinationBtn: {
    backgroundColor: color.mainColor100,
    padding: 15,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center'
  },

  selectDestinationBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },

  customHeader3: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 32,
    paddingBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
    height: 80,
    zIndex: 12,
    paddingHorizontal: 16
  },

  BackIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  SearchInputContainer: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16
  },
  SearchInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    flex: 1
  }
})
