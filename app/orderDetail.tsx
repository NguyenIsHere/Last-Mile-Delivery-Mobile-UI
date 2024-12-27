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

import BookmarkIcon from '../assets/icons/bookmark.svg'
import LeftArrow from '../assets/icons/angle-small-left.svg'
import RightArrow from '../assets/icons/angle-small-right.svg'
import Round from '../assets/icons/dot-circle.svg'

import Svg from 'react-native-svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const screenWidth = Dimensions.get('window').width

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
  Icon: React.FC<React.ComponentProps<typeof BookmarkIcon>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

function isItemDetailsComplete (itemDetails: {
  size: string
  weight: string
  type: string
  insurance: string
}): boolean {
  // Kiểm tra nếu mọi giá trị đều khác rỗng
  return (
    itemDetails.size.trim() !== '' &&
    itemDetails.weight.trim() !== '' &&
    itemDetails.type.trim() !== '' &&
    itemDetails.insurance.trim() !== ''
  )
}

export default function FullWidthScrollView () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng

  const [deliveryOptionsVisible, setDeliveryOptionsVisible] = useState(false)
  const [vehicleOptionsVisible, setVehicleOptionsVisible] = useState(false)

  const [deliveryOption, setDeliveryOption] = useState('option 1')
  const [vehicleOption, setVehicleOption] = useState('option 1')

  const { orderInfo, updateOrderInfo } = useOrderContext()

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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
                <SvgIcon Icon={Round} size={12} color='#3282B9' />
                <Text
                  style={
                    orderInfo.senderIn4.address
                      ? { fontWeight: 'bold', color: '#202020' }
                      : { fontFamily: 'Quicksand-Medium', color: '#6B6B6B' }
                  }
                  numberOfLines={1}
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
                    color:
                      orderInfo.senderIn4.name && orderInfo.senderIn4.phone
                        ? '#6B6B6B'
                        : '#1B6DC5',
                    fontFamily:
                      orderInfo.senderIn4.name && orderInfo.senderIn4.phone
                        ? 'Quicksand-Medium'
                        : 'Quicksand-Bold',
                    marginBottom: 10
                  }}
                  numberOfLines={1}
                >
                  {orderInfo.senderIn4.name && orderInfo.senderIn4.phone ? (
                    `${orderInfo.senderIn4.name} • ${orderInfo.senderIn4.phone}`
                  ) : (
                    <>
                      Thêm thông tin người gửi
                      <Text style={{ color: '#DF7065' }}>*</Text>
                    </>
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/addressInput')}
              >
                <SvgIcon Icon={Round} size={12} color='#F75536' />
                <Text
                  style={
                    orderInfo.receiverIn4.address
                      ? { fontFamily: 'Quicksand-Bold', color: '#202020' }
                      : { fontFamily: 'Quicksand-Medium', color: '#6B6B6B' }
                  }
                  numberOfLines={1}
                >
                  {orderInfo.receiverIn4.address || 'Giao đến đâu?'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.orderContent}
                onPress={() => router.push('/receiverInfo')}
              >
                <View style={styles.dots}>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                  <View style={styles.dot}></View>
                </View>
                <Text
                  style={{
                    color:
                      orderInfo.receiverIn4.name && orderInfo.receiverIn4.phone
                        ? '#6B6B6B'
                        : '#1B6DC5',
                    fontFamily:
                      orderInfo.receiverIn4.name && orderInfo.receiverIn4.phone
                        ? 'Quicksand-Medium'
                        : 'Quicksand-Bold',
                    marginBottom: 10
                  }}
                  numberOfLines={1}
                >
                  {orderInfo.receiverIn4.name && orderInfo.receiverIn4.phone ? (
                    `${orderInfo.receiverIn4.name} • ${orderInfo.receiverIn4.phone}`
                  ) : (
                    <>
                      Thêm thông tin người nhận
                      <Text style={{ color: '#DF7065' }}>*</Text>
                    </>
                  )}
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
                <SvgIcon Icon={Round} size={12} color='#C1C1C1' />
                <Text
                  style={{ fontFamily: 'Quicksand-Bold', color: '#6B6B6B' }}
                >
                  Thêm / Chỉnh sửa điểm giao
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.otherButton}
              onPress={() => setDeliveryOptionsVisible(true)}
            >
              <PngIcon name={FastIcon} size={24} />
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
              <PngIcon name={MotorIcon} size={24} />
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
              <PngIcon name={DetailBoxIcon} size={24} />
              <View style={styles.rightContent}>
                <View style={styles.topContent}>
                  <Text
                    style={{
                      color: isItemDetailsComplete(orderInfo.itemDetails)
                        ? '#202020'
                        : '#1B6DC5',
                      fontFamily: 'Quicksand-Bold'
                    }}
                    numberOfLines={1}
                  >
                    {isItemDetailsComplete(orderInfo.itemDetails) ? (
                      `${orderInfo.itemDetails.size} • ${orderInfo.itemDetails.weight}kg • ${orderInfo.itemDetails.type}`
                    ) : (
                      <>
                        Thêm chi tiết món hàng
                        <Text style={{ color: '#DF7065' }}>*</Text>
                      </>
                    )}
                  </Text>
                  <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
                </View>
                <Text style={styles.normalText}>
                  {isItemDetailsComplete(orderInfo.itemDetails)
                    ? 'Delivery Guarantee • ' + orderInfo.itemDetails.insurance
                    : 'Delivery Guarantee • Cơ bản'}
                </Text>
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
                        deliveryOption === 'option 1' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 1 chosen')
                        setDeliveryOption('option 1')
                      }}
                    >
                      <PngIcon name={FastIcon} size={24} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionTop}>
                          <Text style={styles.optionTitle}>Siêu tốc</Text>
                          <Text style={styles.optionTitle}>
                            29.000{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>
                              đ
                            </Text>
                          </Text>
                        </View>
                        <Text style={styles.optionText}>
                          Giao nhanh 30 phút/5km
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        deliveryOption === 'option 2' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 2 chosen')
                        setDeliveryOption('option 2')
                      }}
                    >
                      <PngIcon name={WalletIcon} size={24} />
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
                        deliveryOption === 'option 3' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 3 chosen')
                        setDeliveryOption('option 3')
                      }}
                    >
                      <PngIcon name={CheapIcon} size={24} />
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
                        vehicleOption === 'option 1' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 1 chosen')
                        setVehicleOption('option 1')
                        setVehicleOptionsVisible(false)
                      }}
                    >
                      <PngIcon name={MotorIcon} size={24} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionTop}>
                          <Text style={styles.optionTitle}>Xe máy</Text>
                          <Text style={styles.optionTitle}>
                            106.000{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>
                              đ
                            </Text>
                          </Text>
                        </View>
                        <Text style={styles.optionText}>
                          Hàng hóa tối đa 30kg (50x40x50cm)
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        vehicleOption === 'option 2' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 2 chosen')
                        setVehicleOption('option 2')
                        setVehicleOptionsVisible(false)
                      }}
                    >
                      <PngIcon name={VanIcon} size={24} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionTop}>
                          <Text style={styles.optionTitle}>
                            Xe Tải/ Van 500kg
                          </Text>
                          <Text style={styles.optionTitle}>
                            331.000{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>
                              đ
                            </Text>
                          </Text>
                        </View>
                        <Text style={styles.optionText}>
                          Lên tới 500kg (160x120x120cm)
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        vehicleOption === 'option 3' &&
                          styles.selectedOptionButton // Nếu được chọn, áp dụng style khác
                      ]}
                      onPress={() => {
                        console.log('Option 3 chosen')
                        setVehicleOption('option 3')
                        setVehicleOptionsVisible(false)
                      }}
                    >
                      <PngIcon name={TruckIcon} size={24} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionTop}>
                          <Text style={styles.optionTitle}>
                            Xe Tải/ Van 1000kg
                          </Text>
                          <Text style={styles.optionTitle}>
                            403.000{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>
                              đ
                            </Text>
                          </Text>
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
              <PngIcon name={VoucherIcon} size={24} />
              <View style={styles.voucherText}>
                <Text style={styles.normalText}>
                  Áp dụng ưu đãi để được giảm giá
                </Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Saved info */}
        <View style={styles.submitButtonContainer}>
          <View style={styles.submitContainerText}>
            <Text style={styles.submitContainerBlackText}>Tổng cộng</Text>
            <Text style={styles.submitContainerBoldText}>
              19.000 <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
            </Text>
          </View>
          <View style={styles.submitButtonGroup}>
            <TouchableOpacity style={styles.saveOrderButton}>
              <SvgIcon Icon={BookmarkIcon} size={24} color='#2A5958' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => router.push('/orderCheck')}
            >
              <Text style={styles.submitButtonText}>Kiểm tra đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
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
    paddingTop: 18
  },
  addressPart: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
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
    fontFamily: 'Quicksand-Bold'
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
    fontSize: 14,
    fontFamily: 'Quicksand-Medium'
  },
  optionTextAlert: {
    color: '#E27265',
    fontSize: 14,
    fontFamily: 'Quicksand-Medium'
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
    fontFamily: 'Quicksand-Bold'
  },
  orderContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
    marginBottom: 4,
    paddingHorizontal: 4
  },
  boldText: {
    color: '#202020',
    fontFamily: 'Quicksand-Bold'
  },
  normalText: {
    color: '#6B6B6B',
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

  otherButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#A4A4A4',
    paddingVertical: 16
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
    gap: 2
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
    color: '#4B4B4B',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
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
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold'
  },
  submitButtonActive: {
    backgroundColor: '#2A5958'
  },
  submitButtonTextActive: {
    color: '#FFFFFF'
  },
  submitContainerBlackText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Quicksand-Medium'
  },
  submitContainerBoldText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold'
  },
  voucherGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 28,
    width: '100%'
  },
  voucherTitle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10
  },
  voucherButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF'
  },
  voucherText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    fontFamily: 'Quicksand-Medium'
  }
})
