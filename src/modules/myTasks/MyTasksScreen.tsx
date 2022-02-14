import React from 'react'
import { StyleSheet, View } from 'react-native'
import CalendatBanner from 'components/CalendatBanner'
import { theme } from 'shared'

const MyTasksScreen = () => {
  return (
    <View style={styles.container}>
      <CalendatBanner />
    </View>
  )
}

export default MyTasksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.bg.primary,
  },
})
