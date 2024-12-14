import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  TextInput
} from 'react-native'

import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useOrderContext } from '../context/orderContext'

const map = require('../assets/images/map.jpg')

import LeftArrow from '../assets/icons/angle-small-left.svg'
import Check from '../assets/icons/check.svg'

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof LeftArrow>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

export default function SenderInfoInputScreen () {
  const router = useRouter()

  const [senderInfo, setSenderInfo] = useState({
    address: '',
    houseNumber: '',
    name: '',
    phone: '',
    note: ''
  })

  const { orderInfo, updateOrderInfo } = useOrderContext()

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const [isChecked, setIsChecked] = useState(false)

  // Hàm kiểm tra nếu tất cả các trường bắt buộc đã được điền
  function isFormComplete (senderIn4: {
    address: string
    name: string
    phone: string
  }): boolean {
    // Kiểm tra nếu mọi giá trị đều khác rỗng
    return (
      senderIn4.address.trim() !== '' &&
      senderIn4.name.trim() !== '' &&
      senderIn4.phone.trim() !== ''
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={map}
          style={{
            width: screenWidth,
            height: screenHeight * 0.2
          }}
          resizeMode='cover'
        />
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => router.back()}
        >
          <SvgIcon Icon={LeftArrow} size={24} color='#000' />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>Người gửi</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={styles.labelText}>
            Địa chỉ <Text style={{ color: '#DF7065' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Nhập địa chỉ'
            value={orderInfo.senderIn4.address}
            onChangeText={address =>
              updateOrderInfo({
                senderIn4: {
                  ...orderInfo.senderIn4,
                  address: address
                }
              })
            }
            numberOfLines={1}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.labelText}>Số tầng, số tòa nhà</Text>
          <TextInput
            style={styles.input}
            placeholder='Thêm số tầng hoặc số căn hộ'
            value={orderInfo.senderIn4.houseNumber}
            onChangeText={houseNumber =>
              updateOrderInfo({
                senderIn4: {
                  ...orderInfo.senderIn4,
                  houseNumber: houseNumber
                }
              })
            }
            numberOfLines={1}
          />
          <Text style={styles.characterCountText}>0/120</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.labelText}>
            Tên người liên lạc <Text style={{ color: '#DF7065' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Tên'
            value={orderInfo.senderIn4.name}
            onChangeText={name =>
              updateOrderInfo({
                senderIn4: {
                  ...orderInfo.senderIn4,
                  name: name
                }
              })
            }
            numberOfLines={1}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.labelText}>
            Số điện thoại <Text style={{ color: '#DF7065' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Số điện thoại'
            value={orderInfo.senderIn4.phone}
            onChangeText={phone =>
              updateOrderInfo({
                senderIn4: {
                  ...orderInfo.senderIn4,
                  phone: phone
                }
              })
            }
            numberOfLines={1}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.labelText}>Ghi chú cho tài xế</Text>
          <TextInput
            style={styles.input}
            placeholder='Ghi chú cho tài xế'
            value={orderInfo.senderIn4.note}
            onChangeText={address =>
              updateOrderInfo({
                senderIn4: {
                  ...orderInfo.senderIn4,
                  note: address
                }
              })
            }
            numberOfLines={1}
          />
          <Text style={styles.characterCountText}>0/120</Text>
        </View>
        <View style={styles.saveInfoGroup}>
          <View style={styles.saveInfoTextGroup}>
            <Text style={styles.saveInfoTitleText}>Lưu thông tin này</Text>
            <Text style={styles.saveInfoSubText}>
              Lưu thông tin người gửi cho các lần giao hàng sau
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkedBox]}
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked && <SvgIcon Icon={Check} size={16} color='#fff' />}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.submitButtonActive,
          !isFormComplete(orderInfo.senderIn4) && styles.submitButton // Đổi màu nút khi không thể bấm
        ]}
        onPress={() => {
          if (isFormComplete(orderInfo.senderIn4)) {
            router.push('/orderDetail')
          }
        }}
        disabled={!isFormComplete(orderInfo.senderIn4)} // Vô hiệu hóa nút khi form chưa đầy đủ
      >
        <Text
          style={[
            styles.submitButtonTextActive,
            !isFormComplete(orderInfo.senderIn4) && styles.submitButtonText // Đổi màu nút khi không thể bấm
          ]}
        >
          Xác nhận
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    marginTop: 16,
    paddingHorizontal: 16
  },
  backButtonContainer: {
    position: 'absolute',
    top: 24,
    left: 12,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 18,
    elevation: 10
  },
  formGroup: {
    marginTop: 16,
    marginBottom: 10
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 16
  },
  labelText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#5D5D5D'
  },
  characterCountText: {
    fontSize: 12,
    color: '#5D5D5D',
    alignSelf: 'flex-end',
    marginTop: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16
  },
  submitButton: {
    backgroundColor: '#F5F6F6',
    width: '80%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16
  },
  submitButtonActive: {
    backgroundColor: '#03B151',
    width: '80%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16
  },
  submitButtonText: {
    color: '#5D5D5D',
    fontSize: 16,
    fontWeight: 'bold'
  },
  submitButtonTextActive: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveInfoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32
  },
  saveInfoTextGroup: {
    flexDirection: 'column'
  },
  saveInfoTitleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveInfoSubText: {
    fontSize: 12,
    color: '#5D5D5D'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#5D5D5D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedBox: {
    backgroundColor: '#03B151',
    borderColor: '#03B151'
  },
  checkmark: {
    color: '#fff',
    fontSize: 16
  }
})
