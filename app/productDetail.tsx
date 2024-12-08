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

const AddressIcon = require('../assets/pngicons/015-location.png')
const BoxAddressIcon = require('../assets/pngicons/004-location-pin.png')

const food = require('../assets/pngicons/013-on-time.png')
const tshirt = require('../assets/pngicons/013-on-time.png')
const phone = require('../assets/pngicons/013-on-time.png')
const fragile = require('../assets/pngicons/013-on-time.png')

const grabman = require('../assets/images/grabmanwithpackage.png')

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

export default function productDetailInputScreen () {
  const [productDetail, setProductDetail] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  })

  const [selectedSize, setSelectedSize] = useState<string>('M')
  const sizes = ['S', 'M', 'L', 'XL']

  const types = [
    {
      name: 'Thực phẩm',
      PngIcon: food
    },
    {
      name: 'Quần áo',
      PngIcon: tshirt
    },
    {
      name: 'Điện tử',
      PngIcon: phone
    },
    {
      name: 'Dễ vỡ',
      PngIcon: fragile
    },
    {
      name: 'Khác',
      PngIcon: food
    }
  ]

  const [selectedType, setSelectedType] = useState<any>({
    name: 'Thực phẩm',
    PngIcon: food
  })

  const insurances = [
    {
      name: 'Cơ bản',
      price: 'mặc định'
    },
    {
      name: 'Tiêu chuẩn',
      price: '4.000đ'
    },
    {
      name: 'Nâng cao',
      price: '10.000đ'
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
        <Text>
          Thông tin này giúp các tài xế sắp xếp và bảo quản hàng đúng cách
        </Text>
        <Image source={grabman} style={{ width: screenWidth, height: 200 }} />
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
                  onPress={() => setSelectedSize(size)}
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
                value={productDetail.description}
                onChangeText={text =>
                  setProductDetail({ ...productDetail, description: text })
                }
              />
              <Text style={styles.kg}>Kg</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addImageButton}>
          <Text>Thêm ảnh (Không bắt buộc)</Text>
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
                  selectedType === type.name && styles.selectedTypeButton // Nếu được chọn, áp dụng style khác
                ]}
                onPress={() => setSelectedType(type.name)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedType === type.name && styles.selectedButtonText // Nếu được chọn, đổi màu chữ
                  ]}
                >
                  {type.name}
                </Text>
                <PngIcon name={type.PngIcon} size={24} />
              </TouchableOpacity>
            ))}
          </ScrollView>
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
                onPress={() => setSelectedInsurance(insurance.name)}
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
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          // onPress={() => router.push('/addressInput')}
        >
          <Text style={styles.submitButtonText}>Xác nhận</Text>
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
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12
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
    fontWeight: 'bold'
  },
  selectedButtonText: {
    color: '#FFFFFF', // Màu chữ khi được chọn
    fontWeight: 'bold'
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
    fontWeight: 'bold'
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
    color: '#2A5958'
  },
  selectedTypeButtonText: {
    color: '#FFFFFF' // Màu chữ khi được chọn
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
    color: '#2A5958'
  },
  selectedButtonSubText: {
    color: '#FFFFFF' // Màu chữ khi được chọn
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
    fontWeight: 'bold'
  },
  submitButtonActive: {
    backgroundColor: '#2A5958'
  },
  submitButtonTextActive: {
    color: '#FFFFFF'
  }
})
