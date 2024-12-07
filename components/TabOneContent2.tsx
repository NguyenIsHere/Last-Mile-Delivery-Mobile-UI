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

const PackageIcon = require('../assets/pngicons/013-on-time.png')
const PlaneIcon = require('../assets/pngicons/009-cargo-plane.png')
const SearchPackageIcon = require('../assets/pngicons/005-tracking.png')
const PostOfficeIcon = require('../assets/pngicons/018-map.png')
const DollarIcon = require('../assets/pngicons/011-tracking-1.png')
const GuideIcon = require('../assets/pngicons/024-book-1.png')

import SearchIcon from '../assets/icons/search.svg'
import CouponIcon from '../assets/icons/ticket.svg'
import BellIcon from '../assets/icons/bell.svg'

const AddressIcon = require('../assets/pngicons/015-location.png')
const BoxAddressIcon = require('../assets/pngicons/004-location-pin.png')

const avatar = require('../assets/images/Mei.png')
const banner = require('../assets/images/banner.jpg')

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

function ButtonIcon ({
  name,
  label
}: {
  name: ImageSourcePropType
  label: string
}) {
  return (
    <TouchableOpacity style={styles.button}>
      <PngIcon name={name} size={32} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

function ButtonIcon2 ({
  name,
  label,
  onPress
}: {
  name: ImageSourcePropType
  label: string
  onPress?: () => void // Thêm hàm onPress (optional)
}) {
  return (
    <TouchableOpacity style={styles.button2} onPress={onPress}>
      <PngIcon name={name} size={24} />
      <Text style={styles.buttonText2}>{label}</Text>
    </TouchableOpacity>
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
      contentContainerStyle={[styles.container, { width: screenWidth }]}
    >
      {/* Background */}
      <LinearGradient
        colors={['#CE012C', '#F00132']}
        style={styles.header}
      ></LinearGradient>
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
          <TouchableOpacity>
            <SvgIcon Icon={BellIcon} size={20} color='#FDFDFF' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Địa chỉ */}
      <View style={styles.addressContainer}>
        <ButtonIcon2
          name={AddressIcon}
          label='Địa chỉ gửi hàng'
          onPress={() => router.push('/addressInput')} // Điều hướng đến đường dẫn
        />
        <ButtonIcon2
          name={BoxAddressIcon}
          label='Bạn muốn gửi hàng tới?'
          onPress={() => router.push('/addressInput')} // Điều hướng tương tự
        />
      </View>

      {/* Nút chia thành hai hàng */}
      {/* <View style={styles.buttonsContainer}>
        <ButtonIcon name={PackageIcon} label='Tạo đơn giao ngay' />
        <ButtonIcon name={PlaneIcon} label='Tạo đơn quốc tế' />
        <ButtonIcon name={SearchPackageIcon} label='Tra cứu đơn hàng' />
        <ButtonIcon name={PackageIcon} label='Trò chơi giải trí' />
        <ButtonIcon name={PostOfficeIcon} label='Tìm kiếm bưu cục' />
        <ButtonIcon name={DollarIcon} label='Tra tính cước phí' />
        <ButtonIcon name={GuideIcon} label='Hướng dẫn sử dụng' />
        <ButtonIcon name={PackageIcon} label='Thống kê chi phí' />
      </View> */}

      {/* Đơn hàng đã lưu */}
      <View style={styles.savedOrderGroup}>
        <Text style={styles.titleText}>Đơn hàng đã lưu</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
          style={styles.savedOrderHorizontalList}
        >
          <View style={styles.orderListContainer}>
            <TouchableOpacity style={styles.savedOrderItem}>
              <View style={styles.orderContent}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.boldText}>Nguyễn Văn A</Text>
                <Text style={styles.normalText}>56/34 Hai Ba Trung St.</Text>
              </View>
              <View style={styles.dots}>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.dot}>•</Text>
              </View>
              <View style={styles.orderContent}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.boldText}>Trần Văn B</Text>
                <Text style={styles.normalText}>Di An High School</Text>
              </View>
              <View style={styles.orderService}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.blackText}>Instant</Text>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.blackText}>S • 1kg</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.savedOrderItem}>
              <View style={styles.orderContent}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.boldText}>Nguyễn Văn A</Text>
                <Text style={styles.normalText}>56/34 Hai Ba Trung St.</Text>
              </View>
              <View style={styles.dots}>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.dot}>•</Text>
              </View>
              <View style={styles.orderContent}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.boldText}>Trần Văn B</Text>
                <Text style={styles.normalText}>Di An High School</Text>
              </View>
              <View style={styles.orderService}>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.blackText}>Instant</Text>
                <PngIcon name={PackageIcon} size={24} />
                <Text style={styles.blackText}>S • 1kg</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Banner quảng cáo */}
      <Text style={styles.titleText}>Khám phá ưu đãi ngay</Text>
      <View>
        <Image source={banner} style={styles.banner} />
      </View>

      <Text style={styles.titleText}>Tin tức và khám phá</Text>
      {/* Banner quảng cáo */}
      <View>
        <Image source={banner} style={styles.banner} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
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
    padding: 20
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
    width: '100%',
    height: 150,
    borderRadius: 15
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
    borderRadius: 10,
    padding: 10
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
    fontWeight: 'bold',
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
    fontWeight: 'bold'
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
    fontWeight: 'bold'
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
    borderWidth: 1.5,
    borderColor: 'gray',
    width: screenWidth - 32
  },
  orderContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  normalText: {
    color: 'gray'
  },
  dots: {
    justifyContent: 'space-between',
    height: 12, // Chiều cao tổng cộng của chuỗi dấu chấm
    marginLeft: 12
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc'
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
    color: 'black'
  }
})
