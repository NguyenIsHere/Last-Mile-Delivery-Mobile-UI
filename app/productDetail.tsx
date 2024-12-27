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
import { LinearGradient } from 'expo-linear-gradient'
import { useOrderContext } from '../context/orderContext'

const AddressIcon = require('../assets/pngicons/015-location.png')
const BoxAddressIcon = require('../assets/pngicons/004-location-pin.png')

import Svg from 'react-native-svg'

import food from '../assets/icons/restaurant.svg'
import tshirt from '../assets/icons/shirt-long-sleeve.svg'
import fragile from '../assets/icons/wine-glass-crack.svg'
import phone from '../assets/icons/mobile-notch.svg'
import more from '../assets/icons/menu-dots.svg'

// const tshirt = require('../assets/icons/shirt-long-sleeve.svg')
// const fragile = require('../assets/icons/wine-glass-crack.svg')
// const phone = require('../assets/icons/mobile-notch.svg')
// const more = require('../assets/icons/menu-dots.svg')

const grabman = require('../assets/images/grabmanwithpackage.png')
const small = require('../assets/images/VN_Small.svg.png')
const medium = require('../assets/images/VN_Medium.svg.png')
const large = require('../assets/images/VN_Large.svg.png')
const xlarge = require('../assets/images/VN_ExtraLarge.svg.png')

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
    <Image source={name} style={{ width: size, height: size, marginTop: 2 }} />
  )
}

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof phone>>
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

export default function productDetailInputScreen () {
  const [productDetail, setProductDetail] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  })

  const { orderInfo, updateOrderInfo } = useOrderContext()

  const [selectedSize, setSelectedSize] = useState<string>(
    orderInfo.itemDetails.size
  )
  const sizes = ['S', 'M', 'L', 'XL']

  const sizeImages: Record<string, any> = {
    S: require('../assets/images/VN_Small.svg.png'),
    M: require('../assets/images/VN_Medium.svg.png'),
    L: require('../assets/images/VN_Large.svg.png'),
    XL: require('../assets/images/VN_ExtraLarge.svg.png')
  }

  const types = [
    {
      name: 'Thực phẩm',
      Icon: food
    },
    {
      name: 'Quần áo',
      Icon: tshirt
    },
    {
      name: 'Điện tử',
      Icon: phone
    },
    {
      name: 'Dễ vỡ',
      Icon: fragile
    },
    {
      name: 'Khác',
      Icon: more
    }
  ]

  interface Type {
    name: string
    Icon: React.FC<React.ComponentProps<typeof food>>
  }

  const [selectedType, setSelectedType] = useState<Type>({
    name: 'Thực phẩm',
    Icon: food
  })

  const insurances = [
    {
      name: 'Cơ bản',
      price: '2.000'
    },
    {
      name: 'Tiêu chuẩn',
      price: '4.000'
    },
    {
      name: 'Nâng cao',
      price: '10.000'
    }
  ]
  const [selectedInsurance, setSelectedInsurance] = useState<any>({
    name: 'Cơ bản',
    price: 'mặc định'
  })

  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
        contentContainerStyle={[styles.scrollView]}
      >
        <Text style={{ fontFamily: 'Quicksand-Medium' }}>
          Thông tin này giúp các tài xế sắp xếp và bảo quản hàng đúng cách
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={sizeImages[selectedSize]}
            style={{
              width: screenWidth,
              height: screenWidth / 2.5,
              marginTop: 16
            }}
            resizeMode='contain'
          />
        </View>

        <View style={styles.form}>
          <View style={styles.sizeGroup}>
            <Text style={styles.title}>
              Kích cỡ <Text style={{ color: '#DF7065' }}>*</Text>
            </Text>
            <View style={styles.buttonGroup}>
              {sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.button,
                    selectedSize === size && styles.selectedButton // Nếu được chọn, áp dụng style khác
                  ]}
                  onPress={() => {
                    setSelectedSize(size),
                      updateOrderInfo({
                        itemDetails: {
                          ...orderInfo.itemDetails,
                          size: size
                        }
                      })
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      selectedSize === size && styles.selectedButtonText // Nếu được chọn, đổi màu chữ
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.weightGroup}>
            <Text style={styles.title}>
              Trọng lượng <Text style={{ color: '#DF7065' }}>*</Text>
            </Text>
            <View style={styles.weightInputGroup}>
              <TextInput
                style={styles.input}
                value={orderInfo.itemDetails.weight}
                onChangeText={text =>
                  updateOrderInfo({
                    itemDetails: { ...orderInfo.itemDetails, weight: text }
                  })
                }
              />
              <Text style={styles.kg}>Kg</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addImageButton}>
          <Text style={{ fontFamily: 'Quicksand-Medium' }}>
            Thêm ảnh (Không bắt buộc)
          </Text>
        </TouchableOpacity>
        <View style={styles.typeGroup}>
          <Text style={styles.typeGroupTitle}>
            Loại hàng hóa <Text style={{ color: '#DF7065' }}>*</Text>
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
            style={styles.typeHorizontalList}
          >
            {types.map(type => (
              <TouchableOpacity
                key={type.name}
                style={[
                  styles.typeButton,
                  selectedType.name === type.name && styles.selectedTypeButton // Nếu được chọn, áp dụng style khác
                ]}
                onPress={() => {
                  setSelectedType(type),
                    updateOrderInfo({
                      itemDetails: {
                        ...orderInfo.itemDetails,
                        type: type.name
                      }
                    })
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedType.name === type.name && styles.selectedButtonText // Nếu được chọn, đổi màu chữ
                  ]}
                >
                  {type.name}
                </Text>
                <SvgIcon
                  Icon={type.Icon}
                  size={24}
                  color={
                    selectedType.name === type.name ? '#FFFFFF' : '#2A5958'
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
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
        </View>
        <View style={styles.insuranceGroup}>
          <Text style={styles.title}>Đảm bảo hàng hóa</Text>
          <View style={styles.insuranceButtonGroup}>
            {insurances.map(insurance => (
              <TouchableOpacity
                key={insurance.name}
                style={[
                  styles.insuranceButton,
                  selectedInsurance === insurance.name &&
                    styles.selectedInsuranceButton // Nếu được chọn, áp dụng style khác
                ]}
                onPress={() => {
                  setSelectedInsurance(insurance.name),
                    updateOrderInfo({
                      itemDetails: {
                        ...orderInfo.itemDetails,
                        insurance: insurance.name
                      }
                    })
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedInsurance === insurance.name &&
                      styles.selectedButtonText // Nếu được chọn, đổi màu chữ
                  ]}
                >
                  {insurance.name}
                </Text>
                <Text
                  style={[
                    styles.buttonSubText,
                    selectedInsurance === insurance.name &&
                      styles.selectedButtonSubText // Nếu được chọn, đổi màu chữ
                  ]}
                >
                  {insurance.price}
                  <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={
            isItemDetailsComplete(orderInfo.itemDetails)
              ? styles.submitButtonActive
              : styles.submitButton
          }
          onPress={() => [updateOrderInfo, router.back()]}
        >
          <Text
            style={
              isItemDetailsComplete(orderInfo.itemDetails)
                ? styles.submitButtonTextActive
                : styles.submitButtonText
            }
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#FFFFFD',
    padding: 16
  },
  scrollView: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFD',
    paddingBottom: 100
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    marginTop: 12,
    marginBottom: 12
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  sizeGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 16
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    width: '80%'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DCF5F2',
    justifyContent: 'center'
  },
  selectedButton: {
    backgroundColor: '#2A5958' // Nền khi được chọn
  },
  buttonText: {
    fontSize: 14,
    color: '#2A5958',
    fontFamily: 'Quicksand-Bold'
  },
  selectedButtonText: {
    color: '#FFFFFF', // Màu chữ khi được chọn
    fontFamily: 'Quicksand-Bold'
  },

  weightGroup: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    marginLeft: 32
  },
  weightInputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '40%',
    marginTop: 4,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 4
  },
  kg: {
    marginLeft: 4,
    marginTop: 4,
    fontWeight: 'bold'
  },
  addImageButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#C0C0C0',
    padding: 16,
    marginTop: 24
  },
  typeGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24
  },
  typeGroupTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
  typeHorizontalList: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  typeButton: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#DCF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    marginRight: 8
  },
  selectedTypeButton: {
    backgroundColor: '#2A5958'
  },
  typeButtonText: {
    color: '#2A5958',
    fontFamily: 'Quicksand-Medium'
  },
  selectedTypeButtonText: {
    color: '#FFFFFF', // Màu chữ khi được chọn,
    fontFamily: 'Quicksand-Medium'
  },
  insuranceGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16
  },
  insuranceButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  insuranceButton: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    borderRadius: 12,
    backgroundColor: '#DCF5F2',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8
  },
  selectedInsuranceButton: {
    backgroundColor: '#2A5958'
  },
  buttonSubText: {
    fontSize: 12,
    color: '#2A5958',
    fontFamily: 'Quicksand-Medium'
  },
  selectedButtonSubText: {
    color: '#FFFFFF', // Màu chữ khi được chọn
    fontFamily: 'Quicksand-Medium'
  },
  submitButtonContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  submitButton: {
    display: 'flex',
    width: screenWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E9E9',
    borderRadius: 25,
    padding: 16
  },
  submitButtonText: {
    color: '#A2A2A2',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
  submitButtonActive: {
    backgroundColor: '#2A5958',
    display: 'flex',
    width: screenWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    padding: 16
  },
  submitButtonTextActive: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  }
})
