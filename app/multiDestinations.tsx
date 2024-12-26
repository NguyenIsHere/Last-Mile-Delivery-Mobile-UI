import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

interface OrderDetails {
  orderName: string
  productName: string
  totalQuantity: string
  unitPrice: string
}

interface Recipient {
  id: string
  name: string
  address: string
  phone: string
  quantity: string
}

interface RecipientItemProps {
  item: Recipient
}

const MultiRecipientOrderScreen: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderName: '',
    productName: '',
    totalQuantity: '',
    unitPrice: ''
  })

  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: '1', name: '', address: '', phone: '', quantity: '' }
  ])

  const addRecipient = (): void => {
    setRecipients([
      ...recipients,
      {
        id: Date.now().toString(),
        name: '',
        address: '',
        phone: '',
        quantity: ''
      }
    ])
  }

  const updateRecipient = (
    id: string,
    field: keyof Recipient,
    value: string
  ): void => {
    setRecipients(
      recipients.map(recipient =>
        recipient.id === id ? { ...recipient, [field]: value } : recipient
      )
    )
  }

  const removeRecipient = (id: string): void => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(recipient => recipient.id !== id))
    } else {
      Alert.alert('Thông báo', 'Đơn hàng phải có ít nhất một người nhận')
    }
  }

  const validateAndSubmit = (): void => {
    if (!orderDetails.orderName || !orderDetails.productName) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin đơn hàng')
      return
    }

    let totalAssignedQuantity = 0
    const isValid = recipients.every(recipient => {
      if (
        !recipient.name ||
        !recipient.address ||
        !recipient.phone ||
        !recipient.quantity
      ) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin người nhận')
        return false
      }
      totalAssignedQuantity += parseInt(recipient.quantity)
      return true
    })

    if (!isValid) return

    if (totalAssignedQuantity !== parseInt(orderDetails.totalQuantity)) {
      Alert.alert(
        'Lỗi',
        'Tổng số lượng phân phối không khớp với số lượng đơn hàng'
      )
      return
    }

    Alert.alert('Thành công', 'Đơn hàng đã được tạo thành công')
  }

  const renderRecipientItem = ({
    item
  }: RecipientItemProps): React.JSX.Element => (
    <View style={styles.recipientContainer}>
      <Text style={styles.recipientHeader}>
        Người nhận #{recipients.indexOf(item) + 1}
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Tên người nhận'
        value={item.name}
        onChangeText={value => updateRecipient(item.id, 'name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Địa chỉ'
        value={item.address}
        onChangeText={value => updateRecipient(item.id, 'address', value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Số điện thoại'
        keyboardType='phone-pad'
        value={item.phone}
        onChangeText={value => updateRecipient(item.id, 'phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Số lượng'
        keyboardType='numeric'
        value={item.quantity}
        onChangeText={value => updateRecipient(item.id, 'quantity', value)}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeRecipient(item.id)}
      >
        {/* <Icon name='delete' size={24} color='#FF4444' /> */}
      </TouchableOpacity>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tạo đơn hàng nhiều người nhận</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
        <TextInput
          style={styles.input}
          placeholder='Tên đơn hàng'
          value={orderDetails.orderName}
          onChangeText={value =>
            setOrderDetails({ ...orderDetails, orderName: value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder='Tên sản phẩm'
          value={orderDetails.productName}
          onChangeText={value =>
            setOrderDetails({ ...orderDetails, productName: value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder='Tổng số lượng'
          keyboardType='numeric'
          value={orderDetails.totalQuantity}
          onChangeText={value =>
            setOrderDetails({ ...orderDetails, totalQuantity: value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder='Đơn giá'
          keyboardType='numeric'
          value={orderDetails.unitPrice}
          onChangeText={value =>
            setOrderDetails({ ...orderDetails, unitPrice: value })
          }
        />
      </View>

      <View style={styles.recipientsContainer}>
        <Text style={styles.sectionTitle}>Danh sách người nhận</Text>
        {recipients.map(item => renderRecipientItem({ item }))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addRecipient}>
        {/* <Icon name='plus-circle' size={24} color='#ffffff' /> */}
        <Text style={styles.addButtonText}>Thêm người nhận</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
        <Text style={styles.submitButtonText}>Tạo đơn hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#2196F3'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  orderDetailsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8
  },
  recipientsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333'
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  recipientContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  recipientHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#666'
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    marginTop: 8
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  }
})

export default MultiRecipientOrderScreen
