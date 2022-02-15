import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Task } from 'typings'
import { windowWidth } from 'utils/dimensions'
import Checkbox from './Checkbox'

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  const { title } = task
  const [isChecked, setIsChecked] = useState(false)
  const handleCheck = () => {
    setIsChecked(!isChecked)
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log('🐵 touch')}>
      <Checkbox onPress={handleCheck} isChecked={false} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth,
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
})
