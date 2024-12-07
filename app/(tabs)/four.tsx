import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import TabFourContent from '@/components/TabFourContent'

export default function TabFourScreen () {
  return (
    <View style={styles.container}>
      <TabFourContent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
