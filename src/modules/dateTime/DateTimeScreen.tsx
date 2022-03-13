import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { theme } from 'shared'

const DateTimeScreen = () => {
  const navigation = useNavigation<StackNavigationProps>()

  const handleGoback = () => navigation.goBack()
  const handleSetDate = () => {
    console.log('🐵 today')
  }
  return (
    <>
      <TouchableOpacity style={styles.outside} onPress={handleGoback} />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSetDate} style={styles.today}>
          <Text style={styles.text}>Today</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default DateTimeScreen

const styles = StyleSheet.create({
  outside: {
    width: '100%',
    height: '60%',
  },
  container: {
    width: '100%',
    height: '40%',
    backgroundColor: theme.bg.primary,
  },
  today: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: theme.font.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
