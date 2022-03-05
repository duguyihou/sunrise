import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
type Props = {
  value: string | undefined
  onChange: (...event: unknown[]) => void
}
const TaskTitle = ({ value, onChange }: Props) => {
  return (
    <TextInput
      multiline
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
