import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { ControllerRenderProps } from 'react-hook-form'

const TaskTitle = (controllerRenderProps: ControllerRenderProps) => {
  const { value, onChange } = controllerRenderProps
  return (
    <TextInput
      style={styles.title}
      value={value}
      onChangeText={onChange}
      placeholder="Add a Task"
      blurOnSubmit={false}
    />
  )
}

export default TaskTitle

const styles = StyleSheet.create({
  title: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
  },
})
