import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { theme } from 'shared'

type Props = { notes: string }
const TaskItemNotes = ({ notes }: Props) => {
  return (
    <Text numberOfLines={2} style={styles.notes}>
      {notes}
    </Text>
  )
}

export default TaskItemNotes

const styles = StyleSheet.create({
  notes: {
    color: theme.font.placeholder,
    paddingVertical: 5,
    marginTop: 4,
  },
})
