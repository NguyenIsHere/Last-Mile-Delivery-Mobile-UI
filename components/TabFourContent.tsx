import React from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType
} from 'react-native'

const ContractIcon = require('../assets/pngicons/027-salary.png')
const ConfigIcon = require('../assets/pngicons/037-content-management.png')
const CommentIcon = require('../assets/pngicons/020-gps.png')
const AddressIcon = require('../assets/pngicons/002-delivery.png')

const NetworkIcon = require('../assets/pngicons/018-map.png')
const FeeIcon = require('../assets/pngicons/012-medical-report.png')

const SecurityIcon = require('../assets/pngicons/032-security.png')
const OrderIcon = require('../assets/pngicons/033-clipboard-1.png')
const NotificationIcon = require('../assets/pngicons/030-school-bell.png')

const GuideIcon = require('../assets/pngicons/024-book-1.png')
const FaqIcon = require('../assets/pngicons/021-information.png')
const IntroIcon = require('../assets/pngicons/026-list.png')

const DeviceIcon = require('../assets/pngicons/034-verification.png')
const SwitchIcon = require('../assets/pngicons/036-refresh.png')
const LogoutIcon = require('../assets/pngicons/035-exit.png')

const screenWidth = Dimensions.get('window').width
const avatar = require('../assets/images/Mei.png')
const banner = require('../assets/images/banner.jpg')
const backgroundImage = require('../assets/images/viettelbg.png')

function PngIcon ({
  name,
  size = 32
}: {
  name: ImageSourcePropType // Dùng const đã khai báo
  size?: number
}) {
  return <Image source={name} style={{ width: size, height: size }} />
}

function ButtonIcon ({
  name,
  label
}: {
  name: ImageSourcePropType
  label: string
}) {
  return (
    <TouchableOpacity style={styles.button}>
      <PngIcon name={name} size={24} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default function FullWidthScrollView () {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu có)
      contentContainerStyle={[styles.container, { width: screenWidth }]}
    >
      {/* Header */}
      <ImageBackground source={backgroundImage} style={styles.header}>
        <View style={styles.header}></View>
      </ImageBackground>

      {/*Profile*/}
      <View style={styles.profileContainer}>
        <Image source={avatar} style={styles.image} />
        <View>
          <Text style={styles.profileName}>Trần Khôi Nguyên</Text>
          <Text style={styles.profilePhone}>0876543210</Text>
        </View>
      </View>

      {/* Banner quảng cáo */}
      <View>
        <Image source={banner} style={styles.banner} />
      </View>

      {/* Quản lí chung  */}
      <Text style={styles.TitleText}>Quản lí chung</Text>
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={ContractIcon} label='Hợp đồng & thanh toán' />
        <ButtonIcon name={ConfigIcon} label='Cấu hình vận hành' />
        <ButtonIcon name={CommentIcon} label='Quản lý, góp ý, khiếu nại' />
        <ButtonIcon name={AddressIcon} label='Địa chỉ gửi hàng' />
      </View>

      {/* Công cụ  */}
      <View style={styles.divider}></View>
      <Text style={styles.TitleText}>Công cụ</Text>
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={NetworkIcon} label='Mạng lưới bưu cục' />
        <ButtonIcon name={FeeIcon} label='Tra tính cước phí' />
      </View>

      {/* Cài đặt  */}
      <View style={styles.divider}></View>
      <Text style={styles.TitleText}>Cài đặt</Text>
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={SecurityIcon} label='Bảo mật tài khoản' />
        <ButtonIcon name={OrderIcon} label='Tùy chọn tạo đơn' />
        <ButtonIcon name={NotificationIcon} label='Thông báo' />
      </View>

      {/* Về ViettelPost */}
      <View style={styles.divider}></View>
      <Text style={styles.TitleText}>Về ViettelPost</Text>
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={GuideIcon} label='Hướng dẫn sử dụng app' />
        <ButtonIcon name={FaqIcon} label='Câu hỏi thường gặp FAQs' />
        <ButtonIcon name={IntroIcon} label='Giới thiệu & Điều khoản' />
      </View>

      {/* Tài khoản */}
      <View style={styles.divider}></View>
      <Text style={styles.TitleText}>Tài khoản</Text>
      <View style={styles.buttonsContainer}>
        <ButtonIcon name={DeviceIcon} label='Danh sách thiết bị đăng nhập' />
        <ButtonIcon name={SwitchIcon} label='Chuyển đổi tài khoản' />
        <View style={styles.divider}></View>
        <ButtonIcon name={LogoutIcon} label='Đăng xuất' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFD'
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
  profileName: {
    marginTop: 5,
    fontFamily: 'Quicksand-Bold',
    color: '#333',
    textAlign: 'center'
  },
  profilePhone: {
    color: '#333',
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center'
  },
  header: {
    position: 'absolute',
    width: screenWidth,
    height: 70,
    backgroundImage: 'url(../assets/images/viettelbg.png)'
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 50
  },
  banner: {
    width: screenWidth - 20,
    height: 150,
    marginLeft: 10,
    borderRadius: 15
  },
  buttonsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 10,
    backgroundColor: '#1111'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: screenWidth,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  buttonText: {
    width: '100%',
    fontSize: 14,
    marginLeft: 10,
    paddingBottom: 15,
    paddingTop: 15,
    color: '#333',
    borderBottomWidth: 1, // Thêm border dưới khi active
    borderColor: '#EEEEEE', // Màu đỏ cho border dưới
    fontFamily: 'Quicksand-Medium'
  },
  TitleText: {
    fontSize: 20,
    color: '#444',
    fontFamily: 'Quicksand-Bold',
    marginLeft: 18,
    marginTop: 10
  },
  divider: {
    width: screenWidth,
    height: 4,
    backgroundColor: '#FEEEEE'
  }
})
