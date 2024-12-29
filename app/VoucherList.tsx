const VoucherImg = require('../assets/images/grab-voucher.jpeg')
const VanIcon = require('../assets/pngicons/Van_36x36.png')
// types.ts
export type Voucher = {
  id: string
  name: string
  image: number // Changed from imageUrl to image for require() result
  daysRemaining: number
  isAvailable: boolean
  isSelected: boolean
}

// VoucherItem.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native'
import { Feather } from '@expo/vector-icons'

interface VoucherItemProps {
  voucher: Voucher
  onSelect?: (id: string) => void // Made optional
}

const VoucherItem: React.FC<VoucherItemProps> = ({
  voucher,
  onSelect = () => {} // Default empty function
}) => {
  const { name, image, daysRemaining, isAvailable, isSelected } = voucher

  const handleSelect = () => {
    if (isAvailable && onSelect) {
      onSelect(voucher.id)
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelect}>
      <Image
        source={image}
        style={[styles.image, !isAvailable && styles.grayScale]}
      />
      <View style={styles.contentContainer}>
        <Text
          style={[styles.title, !isAvailable && styles.unavailableText]}
          numberOfLines={2}
        >
          {name}
        </Text>
        <View style={styles.remainingContainer}>
          <Feather
            name='clock'
            size={16}
            color={isAvailable ? '#ED5D4C' : '#4B4B4B'}
          />
          <Text
            style={[
              styles.remainingText,
              !isAvailable && styles.unavailableRemainingText
            ]}
          >
            {daysRemaining} ngày
          </Text>
        </View>
      </View>
      <View style={styles.radioContainer}>
        <View
          style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
        >
          {isSelected && <Feather name='check' size={12} color='white' />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

// VoucherList.tsx
interface VoucherListProps {
  vouchers?: Voucher[]
  onVoucherSelect?: (id: string) => void // Made optional
}

const VoucherList: React.FC<VoucherListProps> = ({
  vouchers = [
    {
      id: '1',
      name: 'Giảm 40% | Tối đa 15K',
      image: VoucherImg,
      daysRemaining: 5,
      isAvailable: true,
      isSelected: false
    },
    {
      id: '2',
      name: 'Đồng giá 60K chuyến từ 61K',
      image: VoucherImg,
      daysRemaining: 3,
      isAvailable: true,
      isSelected: false
    },
    {
      id: '3',
      name: 'Giảm 30% | Tối đa 200K',
      image: VanIcon,
      daysRemaining: 7,
      isAvailable: false,
      isSelected: false
    },
    {
      id: '4',
      name: 'Giảm 40% | Tối đa 15K',
      image: VoucherImg,
      daysRemaining: 2,
      isAvailable: false,
      isSelected: false
    },
    {
      id: '5',
      name: 'Giảm 30% | Tối đa 15K',
      image: VoucherImg,
      daysRemaining: 1,
      isAvailable: false,
      isSelected: false
    },
    {
      id: '6',
      name: 'Giảm 20% | Tối đa 15K',
      image: VoucherImg,
      daysRemaining: 3,
      isAvailable: false,
      isSelected: false
    },
    {
      id: '7',
      name: 'Giảm 15% | Tối đa 10K',
      image: VoucherImg,
      daysRemaining: 4,
      isAvailable: false,
      isSelected: false
    }
  ],
  onVoucherSelect = () => {} // Default empty function
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder='Tìm kiếm voucher...'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {vouchers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có voucher nào</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVouchers}
          renderItem={({ item }) => (
            <VoucherItem voucher={item} onSelect={onVoucherSelect} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: '#e5e9f0'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  grayScale: {
    opacity: 0.5
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    color: '#4B4B4B',
    marginBottom: 4
  },
  unavailableText: {
    color: '#666666'
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  remainingText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
    color: '#ED5D4C',
    marginLeft: 4
  },
  unavailableRemainingText: {
    color: '#4B4B4B'
  },
  radioContainer: {
    justifyContent: 'center',
    paddingLeft: 12
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioOuterSelected: {
    backgroundColor: '#15BF61',
    borderColor: '#15BF61'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  searchBar: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#e5e9f0',
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium'
  },
  listContent: {
    padding: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: '#666666'
  }
})

export default VoucherList
