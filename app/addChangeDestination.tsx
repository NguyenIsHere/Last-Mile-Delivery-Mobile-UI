import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import Round from '../assets/icons/dot-circle.svg'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const screenWidth = Dimensions.get('window').width

interface SvgIconProps {
  Icon: React.FC<React.ComponentProps<typeof Round>>
  size?: number
  color?: string
}

const SvgIcon: React.FC<SvgIconProps> = ({
  Icon,
  size = 24,
  color = '#000'
}) => {
  return (
    <Icon width={size} height={size} fill={color} style={{ marginTop: 4 }} />
  )
}

interface AddressProps {
  title: string
  content: string
  isReceiver?: boolean
  onDelete?: () => void
  onPress?: () => void
}

const AddressComponent: React.FC<AddressProps> = ({
  title,
  content,
  isReceiver,
  onDelete,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={styles.addressContainer}
      onPress={onPress}
      disabled={!isReceiver}
    >
      <View style={styles.addressLeft}>
        <SvgIcon Icon={Round} size={16} color='#206CC2' />
        <View style={styles.addressContent}>
          <Text style={styles.addressTitle}>{title}</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {content}
          </Text>
        </View>
      </View>

      {isReceiver && (
        <View style={styles.addressRight}>
          <TouchableOpacity onPress={onPress}>
            <Feather name='menu' size={20} color='#4B4B4B' />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Feather name='x' size={20} color='#4B4B4B' />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )
}

const AddChangeDestinationScreen: React.FC = () => {
  const [receivers, setReceivers] = React.useState([
    {
      id: '1',
      title: '1 Trường THPT Dĩ An',
      content: 'Nguyễn Du, P.Dĩ An, Tp.Dĩ An, Bình Dương'
    }
  ])

  const handleAddReceiver = () => {
    const newId = (receivers.length + 1).toString()
    setReceivers([
      ...receivers,
      {
        id: newId,
        title: `${newId} Trường ĐH Công Nghệ Thông Tin`,
        content: 'Hàn Thuyên, KP.6, P.Linh Trung, Tp.Thủ Đức'
      }
    ])
  }

  const handleDeleteReceiver = (id: string) => {
    setReceivers(receivers.filter(receiver => receiver.id !== id))
  }

  const handleChangeAddress = (id: string) => {
    console.log('Navigate to change address screen for receiver:', id)
  }

  const router = useRouter() // Dùng `useRouter` cho điều hướng

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addressContainer}>
        <View style={styles.addressLeft}>
          <SvgIcon Icon={Round} size={16} color='#ED5D4C' />
          <View style={styles.addressContent}>
            <Text style={styles.addressTitle}>Nhà</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              26/12 Kp.7 Q.Tân Bình, Tp.Hồ Chí Minh
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {receivers.map(receiver => (
        <AddressComponent
          key={receiver.id}
          title={receiver.title}
          content={receiver.content}
          isReceiver
          onDelete={() => handleDeleteReceiver(receiver.id)}
          onPress={() => handleChangeAddress(receiver.id)}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddReceiver}>
        <Feather name='plus-circle' size={20} color='#4B4B4B' />
        <Text style={styles.addButtonText}>Thêm điểm giao</Text>
      </TouchableOpacity>

      {/* Saved info */}
      <View style={styles.submitButtonContainer}>
        <View style={styles.submitContainerText}>
          <Text style={styles.submitContainerBlackText}>Tổng cộng</Text>
          <Text style={styles.submitContainerBoldText}>
            19.000 <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
          </Text>
        </View>
        <View style={styles.submitButtonGroup}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push('/orderCheck')}
          >
            <Text style={styles.submitButtonText}>Kiểm tra đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  addressContent: {
    marginLeft: 12,
    flex: 1,
    marginTop: -2
  },
  addressTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: '#4B4B4B'
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Quicksand-Medium',
    color: '#4B4B4B',
    marginTop: 4
  },
  addressRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    color: '#4B4B4B',
    marginTop: -2
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
    width: '100%',
    marginBottom: 10
  },
  submitButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4
  },
  submitButton: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#15BF61',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  submitButtonText: {
    color: '#FFFFFF',
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
  }
})

export default AddChangeDestinationScreen
