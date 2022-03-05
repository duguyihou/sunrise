import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { theme } from 'shared'

type Props = {
  title: string
  isChecked: boolean
}
const TaskItemTitle = ({ title, isChecked }: Props) => {
  return (
    <Text
      numberOfLines={1}
      style={isChecked ? styles.completedTitle : styles.needsActionTitle}>
      {title}
    </Text>
  )
}

export default TaskItemTitle

const styles = StyleSheet.create({
  needsActionTitle: {
    fontSize: 20,
  },
  completedTitle: {
    fontSize: 20,
    color: theme.font.placeholder,
    textDecorationLine: 'line-through',
  },
})
