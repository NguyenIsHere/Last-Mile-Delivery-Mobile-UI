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
      <PngIcon name={BoxAddressIcon} size={24} />
      <View style={styles.addressTextGroup}>
        <Text style={styles.addressTitle}>{title}</Text>
        <Text style={styles.addressDetail}>{address}</Text>
      </View>
    </View>
  )
}

export default function AddressInputScreen () {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('recently')
  const [searchQueryFrom, setSearchQueryFrom] = useState('')
  const [searchQueryTo, setSearchQueryTo] = useState('')
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null)

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
      <View style={styles.searchbar}>
        <View style={styles.searchInputGroup}>
          <PngIcon name={AddressIcon} size={24} />
          <TextInput
            placeholder='Lấy hàng tại đâu?'
            value={searchQueryFrom}
            onFocus={() => handleInputFocus('from')}
            onChangeText={text => setSearchQueryFrom(text)} // Cập nhật trạng thái khi người dùng nhập
            style={styles.input}
          />
        </View>
        <View style={styles.searchInputGroup}>
          <PngIcon name={BoxAddressIcon} size={24} />
          <TextInput
            placeholder='Giao đến đâu?'
            style={styles.input}
            value={searchQueryTo}
            onFocus={() => handleInputFocus('to')}
            onChangeText={text => setSearchQueryTo(text)} // Cập nhật trạng thái khi người dùng nhập
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
        contentContainerStyle={[styles.scrollView, { width: screenWidth }]}
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

              {/* Nếu không có kết quả tìm kiếm nào */}
              {filteredAddressesFrom.length === 0 &&
                filteredAddressesTo.length === 0 && (
                  <Text style={styles.noResultText}>
                    Không tìm thấy kết quả
                  </Text>
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
      <TouchableOpacity style={styles.mapButton}>
        <PngIcon name={AddressIcon} size={24} />
        <Text style={styles.mapButtonText}>Chọn từ bản đồ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFD'
  },
  scrollView: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFD',
    paddingBottom: 50
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    height: screenHeight * 0.9 * 0.2
  },
  searchInputGroup: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#E6E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 4,
    paddingLeft: 8
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4
  },
  theRest: {
    display: 'flex',
    backgroundColor: '#FFFFFD',
    flex: 1,
    paddingHorizontal: 8
  },
  tabMenu: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 16
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5
  },
  activeTabButton: {
    backgroundColor: '#DCF5F2'
  },
  tabButtonText: {
    fontSize: 16,
    color: '#333'
  },
  activeTabButtonText: {
    color: '#2A5958',
    fontWeight: 'bold'
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
    fontWeight: 'bold',
    marginBottom: 4
  },
  addressDetail: {
    fontSize: 14,
    color: '#666'
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
    fontWeight: 'bold',
    marginLeft: 8
  },
  noResultText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 16
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16
  }
})
