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

const PackageIcon = require('../assets/pngicons/013-on-time.png')
const MotorIcon = require('../assets/pngicons/002-delivery-bike.png')
const TruckIcon = require('../assets/pngicons/001-delivery-truck.png')
const VanIcon = require('../assets/pngicons/003-van.png')

const HeartBoxIcon = require('../assets/pngicons/004-box.png')
const CheckBoxIcon = require('../assets/pngicons/005-box-1.png')
const LikeBoxIcon = require('../assets/pngicons/006-box-2.png')
const StarBoxIcon = require('../assets/pngicons/007-box-3.png')

const DetailBoxIcon = require('../assets/pngicons/012-weight-scale.png')
const VoucherIcon = require('../assets/pngicons/019-pennant.png')

import BookmarkIcon from '../assets/icons/bookmark.svg'
import LeftArrow from '../assets/icons/angle-small-left.svg'
import RightArrow from '../assets/icons/angle-small-right.svg'
import Round from '../assets/icons/dot-circle.svg'
import Plus from '../assets/icons/plus.svg'

import MomoIcon from '../assets/icons/momo.svg'

import Svg from 'react-native-svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlipInEasyX } from 'react-native-reanimated'

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

export default function FullWidthScrollView () {
  const router = useRouter() // Dùng `useRouter` cho điều hướng

  const [deliveryOptionsVisible, setDeliveryOptionsVisible] = useState(false)
  const [vehicleOptionsVisible, setVehicleOptionsVisible] = useState(false)

  const [deliveryOption, setDeliveryOption] = useState('option 1')
  const [vehicleOption, setVehicleOption] = useState('option 1')

  return (
    <>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
          contentContainerStyle={[styles.container, { width: screenWidth }]}
        >
          {/* Địa chỉ */}
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  marginBottom: 10
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: '#202020' }}
                  numberOfLines={1}
                >
                  Chi tiết đơn hàng
                </Text>
                <SvgIcon Icon={Plus} size={12} color='#5D5D5D' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <SvgIcon Icon={Round} size={12} color='#3282B9' />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: '#202020' }}
                  numberOfLines={1}
                >
                  Người gửi
                </Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <View style={styles.dots}></View>
              <Text
                style={{ color: '#6B6B6B', marginBottom: 10 }}
                numberOfLines={1}
              >
                Trần Khôi Nguyên • 0867554432
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
              <SvgIcon Icon={Round} size={12} color='#F75536' />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <Text style={{ fontWeight: 'bold', color: '#202020' }}>
                  Người nhận 1
                </Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.orderContent}
              onPress={() => router.push('/addressInput')}
            >
              <View style={styles.dots}></View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#1B6DC5',
                  marginBottom: 10
                }}
                numberOfLines={1}
              >
                Thêm thông tin người nhận
                <Text style={{ color: '#DF7065' }}>*</Text>
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
          </View>

          <View
            style={{
              height: 4,
              backgroundColor: '#EDEAFF',
              marginHorizontal: -16
            }}
          ></View>
          {/* Chọn phương thức giao hàng */}
          <Text style={[styles.voucherTitle, { marginTop: 16 }]}>
            Lựa chọn giao đơn
          </Text>
          <TouchableOpacity
            style={[styles.otherButton, { borderTopWidth: 0 }]}
            onPress={() => setDeliveryOptionsVisible(true)}
          >
            <PngIcon name={CheckBoxIcon} size={24} />
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
                Hàng hóa tối đa 30kg (50x40x50cm)
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
                <Text style={styles.boldText}>S • 1kg • Dễ vỡ</Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
              <Text style={styles.normalText}>
                Delivery Guarantee • 1 Cơ bản
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
                    <PngIcon name={CheckBoxIcon} size={24} />
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
                    <PngIcon name={LikeBoxIcon} size={24} />
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
                    <PngIcon name={HeartBoxIcon} size={24} />
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

          <View
            style={{
              height: 4,
              backgroundColor: '#EDEAFF',
              marginHorizontal: -16
            }}
          ></View>
          {/* Chi tiết thanh toán */}
          <View style={styles.voucherGroup}>
            <Text style={styles.voucherTitle}>Chi tiết thanh toán</Text>
            <TouchableOpacity style={styles.voucherButton}>
              <SvgIcon Icon={MomoIcon} size={24} />
              <View style={styles.voucherText}>
                <Text style={styles.normalText}>Momo</Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.voucherButton,
                ,
                { borderTopWidth: 1, borderTopColor: '#DADADA' }
              ]}
            >
              <PngIcon name={VoucherIcon} size={24} />
              <View style={styles.voucherText}>
                <Text style={styles.normalText}>
                  Áp dụng ưu đãi để được giảm giá
                </Text>
                <SvgIcon Icon={RightArrow} size={16} color='#5D5D5D' />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 4,
              backgroundColor: '#EDEAFF',
              marginHorizontal: -16,
              marginBottom: 16
            }}
          ></View>
          <View style={styles.noteBox}>
            <Text style={{ fontWeight: 'bold', color: '#27282D' }}>
              Lưu ý trước khi giao hàng
            </Text>
            <Text style={{ fontSize: 12, lineHeight: 16, color: '#383A3F' }}>
              Không hỗ trợ giao nhận các loại thư từ, tài liệu, hợp đồng và/hoặc
              các hàng hóa khác thuộc danh mục không được phép giao nhận được
              công bố tại website của Grab. Đặc biệt, giao và nhận hàng hóa bị
              cấm là hành vi vi phạm pháp luật. Trường hợp nghi ngờ bưu gửi có
              dấu hiệu vi phạm, Grab và/hoặc đối tác tài xế có quyền giao nộp
              bưu gửi đó cho cơ quan chức năng để xử lý. Bạn sẽ phải chịu toàn
              bộ trách nhiệm pháp lý liên quan đến bưu gửi vi phạm và tài khoản
              trên Ứng dụng Grab của bạn sẽ bị khóa vĩnh viễn.
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              marginTop: 24,
              marginBottom: 16
            }}
          >
            Bằng việc đặt giao đơn hàng này, bạn đã đồng ý với{' '}
            <Text style={{ color: '#1B6DC5' }}>
              Thông tin Dịch vụ, Điều khoản Sử dụng
            </Text>{' '}
            và <Text style={{ color: '#1B6DC5' }}>Quy chế Hoạt động</Text> của
            chúng tôi
          </Text>
        </ScrollView>
        {/* Saved info */}
        <View style={styles.submitButtonContainer}>
          <View style={styles.submitContainerText}>
            <Text style={styles.submitContainerBlackText}>Tổng cộng</Text>
            <Text style={styles.submitContainerBoldText}>
              19.000
              <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
            </Text>
          </View>
          <View style={styles.submitButtonGroup}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Đặt giao đơn</Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 212
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
    gap: 10,
    overflow: 'hidden',
    marginBottom: 4,
    paddingHorizontal: 4
  },
  boldText: {
    fontWeight: 'bold',
    color: '#303030'
  },
  normalText: {
    color: '#303030'
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
    color: 'black'
  },
  submitButtonContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 80,
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

  submitButton: {
    display: 'flex',
    width: '100%',
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
    paddingVertical: 12,
    marginTop: 8,
    width: '100%'
  },
  voucherTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  voucherButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF'
  },
  voucherText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  noteBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    width: '100%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#E0EDF7'
  }
})
