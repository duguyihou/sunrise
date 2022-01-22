import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>
const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="NewItem" onPress={() => navigation.push('NewItem')} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
