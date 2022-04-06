import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigationProps } from 'typings/route'

function TouchableOpacitySection() {
  const navigation = useNavigation<StackNavigationProps>()

  const handleGoback = () => navigation.goBack()
  return <TouchableOpacity style={styles.outside} onPress={handleGoback} />
}

export default TouchableOpacitySection

const styles = StyleSheet.create({
  outside: {
    flex: 1,
    width: '100%',
  },
})
