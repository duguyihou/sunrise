import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Task } from 'typings'
import { windowWidth } from 'utils/dimensions'

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  const { title } = task
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
})
