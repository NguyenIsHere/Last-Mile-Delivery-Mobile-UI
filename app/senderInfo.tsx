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

export default function SenderInfoInputScreen () {
  const router = useRouter()
  const [senderInfo, setSenderInfo] = useState({
    name: '',
    phone: '',
    address: ''
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên người gửi</Text>
          <TextInput
            style={styles.input}
            value={senderInfo.name}
            onChangeText={name => setSenderInfo({ ...senderInfo, name })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={senderInfo.phone}
            onChangeText={phone => setSenderInfo({ ...senderInfo, phone })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={senderInfo.address}
            onChangeText={address => setSenderInfo({ ...senderInfo, address })}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // router.push('/receiverInfoInput')
          }}
        >
          <Text style={styles.submitButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    padding: 16
  },
  formGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16
  }
})
