import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
const NewItemScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>New Item</Text>
      <Button title=" go to Home" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default NewItemScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
