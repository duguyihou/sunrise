import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { StackProps } from 'typings/route'

const TasklistItem = ({ navigation }: StackProps) => {
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
