import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from 'shared'

type Props = {
  value: string | undefined
  onChange: (...event: unknown[]) => void
}
const TaskNotes = ({ value, onChange }: Props) => {
  return (
    <TextInput
      multiline
      style={styles.notes}
      value={value}
      onChangeText={onChange}
      placeholder="Add Notes"
      blurOnSubmit={false}
    />
  )
}

export default TaskNotes

const styles = StyleSheet.create({
  notes: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: theme.font.placeholder,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: theme.border.primary,
  },
})
