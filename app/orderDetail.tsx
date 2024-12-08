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

const PackageIcon = require('../assets/pngicons/013-on-time.png')
const PlaneIcon = require('../assets/pngicons/009-cargo-plane.png')
const SearchPackageIcon = require('../assets/pngicons/005-tracking.png')
const PostOfficeIcon = require('../assets/pngicons/018-map.png')
const DollarIcon = require('../assets/pngicons/011-tracking-1.png')
const GuideIcon = require('../assets/pngicons/024-book-1.png')

import SearchIcon from '../assets/icons/search.svg'
import CouponIcon from '../assets/icons/ticket.svg'
import BellIcon from '../assets/icons/bell.svg'
import LeftArrow from '../assets/icons/angle-small-left.svg'
import RightArrow from '../assets/icons/angle-small-right.svg'

import Svg from 'react-native-svg'

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
      <View style={styles.header}></View>
      {/* Địa chỉ */}
      <View style={styles.addressContainer}>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.orderContent}
            onPress={() => router.push('/addressInput')}
          >
            <PngIcon name={PackageIcon} size={24} />
            <Text style={styles.boldText}>77/49 Hai Ba Trung St.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsAndSubText}
            onPress={() => router.push('/senderInfo')}
          >
            <View style={styles.dots}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
            </View>
            <Text style={styles.normalText}>Trần Khôi Nguyên • 0867554432</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orderContent}
            onPress={() => router.push('/addressInput')}
          >
            <PngIcon name={PackageIcon} size={24} />
            <Text style={styles.boldText}>Di An High School</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsAndSubText}
            onPress={() => router.push('/receiverInfo')}
          >
            <View style={styles.dots}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dot}>•</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: '#3282B9' }}>
              Thêm thông tin người nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderContent}
            onPress={() => router.push('/addressInput')}
          >
            <PngIcon name={PackageIcon} size={24} />
            <Text style={{ fontWeight: 'bold', color: 'gray' }}>
              Thêm / Chỉnh sửa điểm giao
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => setDeliveryOptionsVisible(true)}
        >
          <PngIcon name={PackageIcon} size={24} />
          <View style={styles.rightContent}>
            <View style={styles.topContent}>
              <Text style={styles.boldText}>
                Lấy hàng ngay (trong vòng 15 phút)
              </Text>
              <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
            </View>
            <Text style={styles.normalText}>Giao vào 17:58 • 1 Tiếng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => setVehicleOptionsVisible(true)}
        >
          <PngIcon name={PackageIcon} size={24} />
          <View style={styles.rightContent}>
            <View style={styles.topContent}>
              <Text style={styles.boldText}>Xe máy</Text>
              <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
            </View>
            <Text style={styles.normalText}>
              Đề xuất dựa trên chi tiết món hàng
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => router.push('/productDetail')}
        >
          <PngIcon name={PackageIcon} size={24} />
          <View style={styles.rightContent}>
            <View style={styles.topContent}>
              <Text style={{ color: '#3282B9', fontWeight: 'bold' }}>
                Thêm chi tiết món hàng
              </Text>
              <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
            </View>
            <Text style={styles.normalText}>Delivery Guarantee • 1 Cơ bản</Text>
          </View>
        </TouchableOpacity>
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
                  style={styles.optionSubmitButton}
                  onPress={() => {
                    setDeliveryOptionsVisible(false)
                  }}
                >
                  <Text style={styles.optionSubmitButtonText}>
                    Chọn loại dịch vụ
                  </Text>
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
      <View style={styles.voucherGroup}>
        <Text style={styles.voucherTitle}>Áp dụng ưu đãi</Text>
        <TouchableOpacity style={styles.voucherButton}>
          <PngIcon name={PackageIcon} size={24} />
          <Text style={styles.normalText}>Áp dụng ưu đãi để được giảm giá</Text>
          <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
        </TouchableOpacity>
      </View>

      {/* Saved info */}
      <View style={styles.submitButtonContainer}>
        <View style={styles.submitContainerText}>
          <Text style={styles.submitContainerBlackText}>Tổng cộng</Text>
          <Text style={styles.submitContainerBoldText}>19.000đ</Text>
        </View>
        <View style={styles.submitButtonGroup}>
          <TouchableOpacity
            style={styles.saveOrderButton}
            // onPress={() => router.push('/addressInput')}
          >
            <SvgIcon Icon={CouponIcon} size={24} color='#2A5958' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            // onPress={() => router.push('/addressInput')}
          >
            <Text style={styles.submitButtonText}>Kiểm tra đơn hàng</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    position: 'absolute',
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#3DB95B'
  },
  addressContainer: {
    display: 'flex',
    height: 'auto',
    width: '100%',
    backgroundColor: '#FDFDFF',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 14
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
  optionSubmitButton: {
    backgroundColor: '#03B151',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    width: '100%'
  },
  optionSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
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
    color: 'gray',
    flex: 1
  },
  dots: {
    justifyContent: 'space-between',
    height: 24, // Chiều cao tổng cộng của chuỗi dấu chấm
    marginLeft: 12,
    width: 22
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ccc'
  },
  dotsAndSubText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  otherButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    paddingVertical: 20
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1
  },
  topContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrow: {
    fontSize: 16
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
  },
  submitButtonContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  submitContainerText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 32,
    marginBottom: 10
  },
  submitButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  saveOrderButton: {
    display: 'flex',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCF5F2',
    borderRadius: 30
  },
  submitButton: {
    display: 'flex',
    width: '78%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#E6E9E9',
    borderRadius: 25,
    padding: 16
  },
  submitButtonText: {
    color: '#A2A2A2',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  submitButtonActive: {
    backgroundColor: '#2A5958'
  },
  submitButtonTextActive: {
    color: '#FFFFFF'
  },
  submitContainerBlackText: {
    color: '#000',
    fontSize: 16
  },
  submitContainerBoldText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  voucherGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 28
  },
  voucherTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  voucherButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#FFFFFF'
  },
  voucherText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10
  }
})
