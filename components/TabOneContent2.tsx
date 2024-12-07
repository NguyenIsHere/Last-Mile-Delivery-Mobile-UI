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
          <TouchableOpacity>
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
        <ButtonIcon2
          name={BoxAddressIcon}
          label='Lấy hàng giao ngay'
          onPress={() => setDeliveryOptionsVisible(true)} // Điều hướng tương tự
        />
        <ButtonIcon2
          name={BoxAddressIcon}
          label='Xe máy'
          onPress={() => setVehicleOptionsVisible(true)} // Điều hướng tương tự
        />
        <ButtonIcon2
          name={BoxAddressIcon}
          label='Thêm chi tiết món hàng'
          onPress={() => router.push('/productDetail')} // Điều hướng tương tự
        />
        {/* Modal chọn giao hàng */}
        <Modal
          visible={deliveryOptionsVisible}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setDeliveryOptionsVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setDeliveryOptionsVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Bạn muốn chọn dịch vụ giao nào?
                </Text>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    deliveryOption === 'option 1' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 1 chosen')
                    setDeliveryOption('option 1')
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Siêu tốc</Text>
                      <Text style={styles.optionTitle}>29.000đ</Text>
                    </View>
                    <Text style={styles.optionText}>
                      Giao nhanh 30 phút/5km
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    deliveryOption === 'option 2' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 2 chosen')
                    setDeliveryOption('option 2')
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Tiết kiệm</Text>
                    </View>
                    <Text style={styles.optionTextAlert}>
                      Chỉ khả dụng từ 6:00 đến 18:00
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    deliveryOption === 'option 3' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 3 chosen')
                    setDeliveryOption('option 3')
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Siêu rẻ</Text>
                    </View>
                    <Text style={styles.optionTextAlert}>
                      Dịch vụ không khả dụng tại vị trí này
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    setDeliveryOptionsVisible(false)
                  }}
                >
                  <Text style={styles.submitButtonText}>Chọn loại dịch vụ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Modal chọn phương tiện */}

        <Modal
          visible={vehicleOptionsVisible}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setVehicleOptionsVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setVehicleOptionsVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Suggested</Text>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    vehicleOption === 'option 1' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 1 chosen')
                    setVehicleOption('option 1')
                    setVehicleOptionsVisible(false)
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Xe máy</Text>
                      <Text style={styles.optionTitle}>106.000đ</Text>
                    </View>
                    <Text style={styles.optionText}>
                      Hàng hóa tối đa 30kg (50x40x50cm)
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    vehicleOption === 'option 2' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 2 chosen')
                    setVehicleOption('option 2')
                    setVehicleOptionsVisible(false)
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Xe Tải/ Van 500kg</Text>
                      <Text style={styles.optionTitle}>331.000đ</Text>
                    </View>
                    <Text style={styles.optionText}>
                      Lên tới 500kg (160x120x120cm)
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    vehicleOption === 'option 3' && styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    console.log('Option 3 chosen')
                    setVehicleOption('option 3')
                    setVehicleOptionsVisible(false)
                  }}
                >
                  <PngIcon name={PackageIcon} size={24} />
                  <View style={styles.optionContent}>
                    <View style={styles.optionTop}>
                      <Text style={styles.optionTitle}>Xe Tải/ Van 1000kg</Text>
                      <Text style={styles.optionTitle}>403.000đ</Text>
                    </View>
                    <Text style={styles.optionText}>
                      Lên tới 1000kg (200x150x150cm)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {/* Nút chia thành hai hàng */}
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={PackageIcon} label='Tạo đơn giao ngay' />
        <ButtonIcon name={PlaneIcon} label='Tạo đơn quốc tế' />
        <ButtonIcon name={SearchPackageIcon} label='Tra cứu đơn hàng' />
        <ButtonIcon name={PackageIcon} label='Trò chơi giải trí' />
        <ButtonIcon name={PostOfficeIcon} label='Tìm kiếm bưu cục' />
        <ButtonIcon name={DollarIcon} label='Tra tính cước phí' />
        <ButtonIcon name={GuideIcon} label='Hướng dẫn sử dụng' />
        <ButtonIcon name={PackageIcon} label='Thống kê chi phí' />
      </View>

      {/* Banner quảng cáo */}
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
    backgroundColor: '#FFFFFD'
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
    width: screenWidth,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
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
    width: screenWidth - 20,
    height: 150,
    margin: 10,
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
    width: screenWidth - 20,
    marginLeft: 10,
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
    marginLeft: 15,
    marginTop: 15,
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
  }
})
