import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'typings'

const TasklistItem = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('Home')}>
      <Text style={styles.text}>My Task</Text>
    </TouchableOpacity>
  )
}

export default TasklistItem

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
})
