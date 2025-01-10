import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import color from '../constants/color'

const Driver = require('../assets/images/home-icon-Assistant.png')

// Types for our chat messages
interface Message {
  id: string
  text: string
  sender: 'user' | 'driver'
  timestamp: Date
}

interface ChatScreenProps {
  driverName: string
  driverPhoto?: string
  orderNumber: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Chào bạn! Mình đã lấy đơn hàng của bạn từ nhà hàng.',
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:22:00')
  },
  {
    id: '2',
    text: 'Tuyệt! Bạn có thể kiểm tra giúp mình xem có thêm nước sốt không nhé?',
    sender: 'user',
    timestamp: new Date('2025-01-11T14:22:30')
  },
  {
    id: '3',
    text: 'Dạ, mình đã kiểm tra kỹ rồi, có thêm nước sốt như bạn yêu cầu nhé.',
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:23:00')
  },
  {
    id: '4',
    text: 'Mình sẽ tới trong khoảng 10 phút nữa. Đường đang khá thông thoáng!',
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:23:30')
  },
  {
    id: '5',
    text: 'Hoàn hảo, cảm ơn bạn! Mình đang chờ ở sảnh.',
    sender: 'user',
    timestamp: new Date('2025-01-11T14:24:00')
  }
]

const ChatScreen: React.FC<ChatScreenProps> = ({
  driverName,
  driverPhoto,
  orderNumber
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user'

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.driverMessage
        ]}
      >
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          {Driver ? (
            <Image source={Driver} style={styles.driverPhoto} />
          ) : (
            <View style={styles.driverPhotoPlaceholder} />
          )}
          <View style={styles.headerText}>
            <Text style={styles.driverName}>Nguyễn Thanh Hải</Text>
            <Text style={styles.orderNumber}>Order #11098A8</Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder='Gõ tin nhắn...'
            placeholderTextColor='#666'
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  header: {
    padding: 16,
    backgroundColor: color.mainColor100,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF'
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  driverPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1
  },
  driverPhotoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDE2E5'
  },
  headerText: {
    marginLeft: 12,
    fontFamily: 'Quicksand-Medium'
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: 'Quicksand-Medium'
  },
  orderNumber: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 2,
    fontFamily: 'Quicksand-Medium'
  },
  messagesList: {
    padding: 16
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    backgroundColor: color.whiteColor70,
    borderRadius: 16
  },
  messageContent: {
    padding: 12,
    borderRadius: 16
  },
  userMessage: {
    alignSelf: 'flex-end'
  },
  driverMessage: {
    alignSelf: 'flex-start'
  },
  messageText: {
    fontSize: 14,
    color: '#212529',
    fontFamily: 'Quicksand-Medium'
  },
  timestamp: {
    fontSize: 10,
    color: '#6C757D',
    marginTop: 4,
    textAlign: 'right',
    fontFamily: 'Quicksand-Medium'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF'
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 100,
    fontFamily: 'Quicksand-Medium'
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mainColor100,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontFamily: 'Quicksand-Medium'
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Quicksand-Medium'
  }
})

export default ChatScreen
