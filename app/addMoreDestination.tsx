import React, { useContext, useEffect, useState } from 'react'
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
  TextInput,
  Keyboard
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useOrderContext } from '../context/orderContext'

const AddressIcon = require('../assets/pngicons/015-location.png')
const BoxAddressIcon = require('../assets/pngicons/004-location-pin.png')

import Round from '../assets/icons/dot-circle.svg'
import Clock from '../assets/icons/clock-five.svg'
import Map from '../assets/icons/region-pin-alt.svg'
import Back from '../assets/icons/arrow-small-left.svg'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function PngIcon ({
  name,
  size = 32
}: {
  name: ImageSourcePropType // Dùng const đã khai báo
  size?: number
}) {
  return <Image source={name} style={{ width: size, height: size }} />
}

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof Round>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

// TabButton component
function TabButton ({
  label,
  isActive,
  onPress
}: {
  label: string
  isActive: boolean
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

function AddressItem ({ title, address }: { title: string; address: string }) {
  return (
    <View style={styles.addressItem}>
      <SvgIcon Icon={Clock} size={16} color='#3BB1E8' />
      <View style={styles.addressTextGroup}>
        <Text style={styles.addressTitle}>{title}</Text>
        <Text style={styles.addressDetail}>{address}</Text>
      </View>
    </View>
  )
}

export default function AddMoreDestinationScreen () {
  // Fake data for demonstration
  const recentlyUsedAddresses = [
    {
      title: 'Trường THPT Dĩ An',
      address: 'Nguyễn Du, P.Dĩ An, Tp.Dĩ An, Bình Dương, 75000, Vietnam'
    },
    {
      title: 'Văn phòng Đại học Quốc gia',
      address: 'Linh Trung, Thủ Đức, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công viên Phú Lâm',
      address: 'Q. Bình Tân, Hồ Chí Minh, 710000, Vietnam'
    },
    {
      title: 'Trường THPT Dĩ An',
      address: 'Nguyễn Du, P.Dĩ An, Tp.Dĩ An, Bình Dương, 75000, Vietnam'
    },
    {
      title: 'Văn phòng Đại học Quốc gia',
      address: 'Linh Trung, Thủ Đức, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công viên Phú Lâm',
      address: 'Q. Bình Tân, Hồ Chí Minh, 710000, Vietnam'
    },
    {
      title: 'Trường THPT Dĩ An',
      address: 'Nguyễn Du, P.Dĩ An, Tp.Dĩ An, Bình Dương, 75000, Vietnam'
    },
    {
      title: 'Văn phòng Đại học Quốc gia',
      address: 'Linh Trung, Thủ Đức, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công viên Phú Lâm',
      address: 'Q. Bình Tân, Hồ Chí Minh, 710000, Vietnam'
    }
  ]

  const savedAddresses = [
    {
      title: 'Nhà riêng',
      address: '123 Lý Thường Kiệt, Q.10, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công ty ABC',
      address: '456 Nguyễn Văn Trỗi, Q. Phú Nhuận, Hồ Chí Minh, 720000, Vietnam'
    },
    {
      title: 'Quán cafe XYZ',
      address: '789 Trần Hưng Đạo, Q.5, Hồ Chí Minh, 710000, Vietnam'
    }
  ]

  const router = useRouter()
  const [activeTab, setActiveTab] = useState('recently')
  const [searchQueryFrom, setSearchQueryFrom] = useState('')
  const [searchQueryTo, setSearchQueryTo] = useState('')
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>('to')
  const { orderInfo, updateOrderInfo } = useOrderContext()

  useEffect(() => {
    console.log('OrderInfo updated:', orderInfo)
  }, [orderInfo]) // Theo dõi khi orderInfo thay đổi

  // Hàm cập nhật thông tin khi nhấn OK hoặc bàn phím mất
  // const handleSave = () => {
  //   updateOrderInfo({ senderAddress, receiverAddress }) // Cập nhật thông tin senderAddress
  // }

  // Fake data for demonstration
  const searchAddresses = [
    {
      title: 'Trường THPT Dĩ An',
      address: 'Nguyễn Du, P.Dĩ An, Tp.Dĩ An, Bình Dương, 75000, Vietnam'
    },
    {
      title: 'Văn phòng Đại học Quốc gia',
      address: 'Linh Trung, Thủ Đức, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công viên Phú Lâm',
      address: 'Q. Bình Tân, Hồ Chí Minh, 710000, Vietnam'
    },
    {
      title: 'Nhà riêng',
      address: '123 Lý Thường Kiệt, Q.10, Hồ Chí Minh, 700000, Vietnam'
    },
    {
      title: 'Công ty ABC',
      address: '456 Nguyễn Văn Trỗi, Q. Phú Nhuận, Hồ Chí Minh, 720000, Vietnam'
    },
    {
      title: 'Quán cafe XYZ',
      address: '789 Trần Hưng Đạo, Q.5, Hồ Chí Minh, 710000, Vietnam'
    }
  ]

  // Hàm lọc địa chỉ
  const filterAddresses = (addresses: any[], query: string) => {
    return addresses.filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.address.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Kết quả tìm kiếm cho mỗi trường input
  const filteredAddressesFrom = filterAddresses(
    searchAddresses,
    searchQueryFrom
  )
  const filteredAddressesTo = filterAddresses(searchAddresses, searchQueryTo)

  const handleInputFocus = (input: 'from' | 'to') => {
    setActiveInput(input)
    if (input === 'from') {
      setSearchQueryTo('') // Reset kết quả tìm kiếm của "Giao đến đâu?"
    } else if (input === 'to') {
      setSearchQueryFrom('') // Reset kết quả tìm kiếm của "Lấy hàng tại đâu?"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <SvgIcon Icon={Back} size={32} color='#202020' />
          </TouchableOpacity>
        </View>
        <View style={styles.searchbar}>
          {/* Input "Giao đến đâu?" */}
          <View
            style={[
              styles.searchInputGroup,
              activeInput === 'from' && { backgroundColor: '#FFFFFF' }
            ]}
          >
            <SvgIcon Icon={Round} size={12} color='#F75536' />
            <TextInput
              placeholder='Giao đến đâu?'
              value={orderInfo.receiverIn4.address}
              onFocus={() => {
                handleInputFocus('to'), updateOrderInfo
              }}
              onChangeText={text => {
                updateOrderInfo({
                  receiverIn4: {
                    ...orderInfo.receiverIn4,
                    address: text
                  }
                })
                setSearchQueryTo(text)
              }}
              onSubmitEditing={() => {
                updateOrderInfo
              }} // Lưu thông tin khi nhấn OK
              onBlur={() => {
                updateOrderInfo
              }} // Lưu thông tin khi mất bàn phím
              style={[
                styles.input,
                activeInput === 'from' && {
                  backgroundColor: '#FFFFFF',
                  fontWeight: 'normal'
                }
              ]}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
        contentContainerStyle={[styles.scrollView]}
      >
        <View style={styles.theRest}>
          {/* Hiển thị kết quả tìm kiếm cho từng ô nhập */}
          {searchQueryFrom || searchQueryTo ? (
            <>
              {/* Hiển thị kết quả từ "Lấy hàng tại đâu?" */}
              {activeInput === 'from' && filteredAddressesFrom.length > 0 && (
                <>
                  <Text style={styles.resultTitle}>
                    Kết quả tìm kiếm từ "Lấy hàng tại đâu?"
                  </Text>
                  {filteredAddressesFrom.map((item, index) => (
                    <AddressItem
                      key={index}
                      title={item.title}
                      address={item.address}
                    />
                  ))}
                </>
              )}

              {/* Hiển thị kết quả từ "Giao đến đâu?" */}
              {activeInput === 'to' && filteredAddressesTo.length > 0 && (
                <>
                  <Text style={styles.resultTitle}>
                    Kết quả tìm kiếm từ "Giao đến đâu?"
                  </Text>
                  {filteredAddressesTo.map((item, index) => (
                    <AddressItem
                      key={index}
                      title={item.title}
                      address={item.address}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            // Nếu không có chuỗi tìm kiếm, hiển thị các tab như bình thường
            <>
              <View style={styles.tabMenu}>
                <TabButton
                  label='Dùng gần đây'
                  isActive={activeTab === 'recently'}
                  onPress={() => setActiveTab('recently')}
                />
                <TabButton
                  label='Đã lưu'
                  isActive={activeTab === 'saved'}
                  onPress={() => setActiveTab('saved')}
                />
              </View>
              <View style={styles.tabContent}>
                {activeTab === 'recently' &&
                  recentlyUsedAddresses.map((item, index) => (
                    <AddressItem
                      key={index}
                      title={item.title}
                      address={item.address}
                    />
                  ))}
                {activeTab === 'saved' &&
                  savedAddresses.map((item, index) => (
                    <AddressItem
                      key={index}
                      title={item.title}
                      address={item.address}
                    />
                  ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => router.push('/chooseFromMap')}
      >
        <SvgIcon Icon={Map} size={14} color='#202020' />
        <Text style={styles.mapButtonText}>Chọn từ bản đồ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFD',
    paddingHorizontal: 16
  },
  scrollView: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFD',
    paddingBottom: 50
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFD',
    paddingTop: 16,
    height: '10%'
  },
  backContainer: {
    paddingVertical: 16,
    paddingRight: 8
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    height: '100%',
    flex: 1
  },
  searchInputGroup: {
    display: 'flex',
    backgroundColor: '#E6E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    paddingLeft: 8
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 8,
    fontFamily: 'Quicksand-Bold'
  },
  theRest: {
    display: 'flex',
    flex: 1
  },
  tabMenu: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-between',
    gap: 8
  },
  tabButton: {
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  activeTabButton: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#DCF5F2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  tabButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Quicksand-Bold'
  },
  activeTabButtonText: {
    color: '#2A5958',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold'
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8
  },
  addressItem: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    padding: 16
  },
  addressTextGroup: {
    flex: 1,
    marginLeft: 16
  },
  addressTitle: {
    fontSize: 16,

    fontFamily: 'Quicksand-Bold',
    marginBottom: 4,
    color: '#202020'
  },
  addressDetail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Quicksand-Medium'
  },
  mapButton: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  mapButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#202020',
    fontFamily: 'Quicksand-Medium'
  },
  noResultText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
    fontFamily: 'Quicksand-Medium'
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    marginTop: 16
  }
})
