import React from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SearchIcon from '../assets/icons/search.svg'
import CouponIcon from '../assets/icons/ticket.svg'
import BellIcon from '../assets/icons/bell.svg'
import TruckIcon from '../assets/icons/shipping-fast.svg'
import PlaneIcon from '../assets/icons/plane-departure (1).svg'
import AssessIcon from '../assets/icons/assessment (1).svg'
import GameIcon from '../assets/icons/gamepad (1).svg'
import VisitIcon from '../assets/icons/visit (1).svg'
import DollarIcon from '../assets/icons/search-dollar (1).svg'
import GuideIcon from '../assets/icons/guide-alt (1).svg'
import AddressIcon from '../assets/icons/marker.svg'
import BoxAddressIcon from '../assets/icons/location-alt.svg'

const screenWidth = Dimensions.get('window').width
const avatar = require('../assets/images/Mei.png')
const banner = require('../assets/images/banner.jpg')
const backgroundImage = require('../assets/images/viettelbg.png')

function SvgIcon ({
  Icon,
  size = 24,
  color = '#000'
}: {
  Icon: React.FC<React.ComponentProps<typeof SearchIcon>>
  size?: number
  color?: string
}) {
  return <Icon width={size} height={size} fill={color} />
}

function ButtonIcon ({
  Icon,
  label
}: {
  Icon: React.FC<React.ComponentProps<typeof SearchIcon>>
  label: string
}) {
  return (
    <TouchableOpacity style={styles.button}>
      <SvgIcon Icon={Icon} size={24} color='#444' />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

function ButtonIcon2 ({
  Icon,
  label
}: {
  Icon: React.FC<React.ComponentProps<typeof SearchIcon>>
  label: string
}) {
  return (
    <TouchableOpacity style={styles.button2}>
      <SvgIcon Icon={Icon} size={20} color='#F00132' />
      <Text style={styles.buttonText2}>{label}</Text>
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
      {/* Background */}
      <LinearGradient
        colors={['#CE012C', '#F00132']}
        style={styles.header}
      ></LinearGradient>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image source={avatar} style={styles.image} />
          <View>
            <Text style={styles.headerText}>Trần Khôi Nguyên</Text>
            <Text style={styles.headerText}>Liên kết Viettel++</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <SvgIcon Icon={SearchIcon} size={20} color='#FDFDFF' />
          <SvgIcon Icon={CouponIcon} size={20} color='#FDFDFF' />
          <SvgIcon Icon={BellIcon} size={20} color='#FDFDFF' />
        </View>
      </View>

      {/* Địa chỉ */}
      <View style={styles.addressContainer}>
        <ButtonIcon2 Icon={AddressIcon} label='Bạn ở đâu?' />
        <ButtonIcon2 Icon={BoxAddressIcon} label='Bạn muốn gửi hàng tới?' />
      </View>

      {/* Nút chia thành hai hàng */}
      <View style={styles.buttonsContainer}>
        <ButtonIcon Icon={TruckIcon} label='Tạo đơn giao ngay' />
        <ButtonIcon Icon={PlaneIcon} label='Tạo đơn quốc tế' />
        <ButtonIcon Icon={AssessIcon} label='Tra cứu đơn hàng' />
        <ButtonIcon Icon={GameIcon} label='Trò chơi giải trí' />
        <ButtonIcon Icon={VisitIcon} label='Tìm kiếm bưu cục' />
        <ButtonIcon Icon={DollarIcon} label='Tra tính cước phí' />
        <ButtonIcon Icon={GuideIcon} label='Hướng dẫn sử dụng' />
        <ButtonIcon Icon={SearchIcon} label='Thống kê số liệu' />
      </View>

      {/* Banner quảng cáo */}
      <View>
        <Image source={banner} style={styles.banner} />
      </View>

      <Text style={styles.titleText}>Tin tức và khám phá</Text>
      {/* Banner quảng cáo */}
      <View>
        <Image source={banner} style={styles.banner} />
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
  headerText: {
    color: '#FDFDFF'
  },
  header: {
    position: 'absolute',
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    height: 140,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  headerContainer: {
    display: 'flex',
    width: screenWidth,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50
  },
  banner: {
    width: screenWidth - 20,
    height: 150,
    margin: 10,
    borderRadius: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10
  },
  button: {
    width: '22%',
    alignItems: 'center',
    marginVertical: 10,
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#333'
  },
  addressContainer: {
    display: 'flex',
    height: 90,
    width: screenWidth - 20,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#FDFDFF',
    elevation: 5,
    borderRadius: 10,
    padding: 10
  },
  button2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: -5,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  buttonText2: {
    marginLeft: 10,
    fontSize: 15,
    textAlign: 'left',
    color: '#444'
  },
  titleText: {
    fontSize: 20,
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 15
  }
})
