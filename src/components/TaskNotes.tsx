import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { ControllerRenderProps } from 'react-hook-form'
import { theme } from 'shared'

const TaskNotes = (controllerRenderProps: ControllerRenderProps) => {
  const { value, onChange } = controllerRenderProps

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
    fontSize: 18,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: theme.border,
  },
})
