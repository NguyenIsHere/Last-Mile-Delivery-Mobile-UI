// Payment.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
  Image
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import BookmarkIcon from '../assets/icons/bookmark.svg'
import MomoIcon from '../assets/icons/momo.svg'
import ZaloPayIcon from '../assets/icons/Zalopay_logo.svg'
import CashIcon from '../assets/icons/usd-square.svg'

// Types
type PaymentMethod = {
  id: string
  name: string
  Icon: React.FC<React.ComponentProps<typeof BookmarkIcon>>
  isSelected?: boolean
}

// SvgIcon Component
const SvgIcon = ({
  Icon,
  size = 32,
  color = '#666666'
}: {
  Icon: React.FC<React.ComponentProps<typeof BookmarkIcon>>
  size?: number
  color?: string
}) => {
  return <Icon width={size} height={size} fill={color} />
}

// PaymentMethodItem Component
const PaymentMethodItem = ({
  method,
  onSelect
}: {
  method: PaymentMethod
  onSelect: (id: string) => void
}) => {
  const { id, name, Icon, isSelected } = method

  return (
    <TouchableOpacity style={styles.methodItem} onPress={() => onSelect(id)}>
      <View style={styles.leftContent}>
        <SvgIcon Icon={Icon} size={24} />
        <View style={styles.nameContainer}>
          <Text style={styles.methodName}>{name}</Text>
          {isSelected && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentText}>Hiện tại</Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
      >
        {isSelected && <Feather name='check' size={12} color='white' />}
      </View>
    </TouchableOpacity>
  )
}

// AddPaymentMethod Component
const AddPaymentMethod = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.addMethodContainer}>
      <Text style={styles.sectionTitle}>Thêm phương thức khác</Text>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <View style={styles.addButtonContent}>
          <Feather name='credit-card' size={24} color='#4B4B4B' />
          <Text style={styles.addButtonText}>Thêm thẻ mới</Text>
        </View>
        <Feather name='chevron-right' size={24} color='#4B4B4B' />
      </TouchableOpacity>
    </View>
  )
}

// Main PaymentScreen Component
const PaymentScreen: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      name: 'Ví MoMo',
      Icon: MomoIcon,
      isSelected: true
    },
    // Add more payment methods as needed
    {
      id: '2',
      name: 'ZaloPay',
      Icon: ZaloPayIcon,
      isSelected: false
    },
    {
      id: '3',
      name: 'Tiền mặt',
      Icon: CashIcon,
      isSelected: false
    }
  ])

  const handleSelectMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isSelected: method.id === id
      }))
    )
  }

  const handleAddNewCard = () => {
    // Handle adding new card
    console.log('Add new card pressed')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.methodsList}>
        {paymentMethods.map(method => (
          <PaymentMethodItem
            key={method.id}
            method={method}
            onSelect={handleSelectMethod}
          />
        ))}
      </View>
      <AddPaymentMethod onPress={handleAddNewCard} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  methodsList: {
    marginTop: 16
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 1
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12
  },
  methodName: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: '#4B4B4B',
    marginRight: 8
  },
  currentBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  currentText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 12,
    color: '#4B4B4B'
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
  addMethodContainer: {
    marginTop: 24
  },
  sectionTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    color: '#4B4B4B',
    marginBottom: 12,
    paddingHorizontal: 16
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButtonText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: '#4B4B4B',
    marginLeft: 12
  }
})

export default PaymentScreen
