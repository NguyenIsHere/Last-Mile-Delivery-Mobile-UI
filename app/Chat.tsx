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
    text: "Hi! I've picked up your order from the restaurant.",
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:22:00')
  },
  {
    id: '2',
    text: "Great! Could you please make sure there's extra sauce included?",
    sender: 'user',
    timestamp: new Date('2025-01-11T14:22:30')
  },
  {
    id: '3',
    text: "Yes, I've double-checked and confirmed the extra sauce is included.",
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:23:00')
  },
  {
    id: '4',
    text: "I'll be there in about 10 minutes. Traffic is smooth!",
    sender: 'driver',
    timestamp: new Date('2025-01-11T14:23:30')
  },
  {
    id: '5',
    text: "Perfect, thank you! I'm at the lobby waiting.",
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
          {driverPhoto ? (
            <Image source={{ uri: driverPhoto }} style={styles.driverPhoto} />
          ) : (
            <View style={styles.driverPhotoPlaceholder} />
          )}
          <View style={styles.headerText}>
            <Text style={styles.driverName}>{driverName}</Text>
            <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
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
            placeholder='Type a message...'
            placeholderTextColor='#666'
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
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
    backgroundColor: '#FFFFFF',
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
    borderRadius: 20
  },
  driverPhotoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDE2E5'
  },
  headerText: {
    marginLeft: 12
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529'
  },
  orderNumber: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2
  },
  messagesList: {
    padding: 16
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4
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
    color: '#212529'
  },
  timestamp: {
    fontSize: 10,
    color: '#6C757D',
    marginTop: 4,
    textAlign: 'right'
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
    maxHeight: 100
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A5CF',
    borderRadius: 20,
    paddingHorizontal: 16
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  }
})

export default ChatScreen
