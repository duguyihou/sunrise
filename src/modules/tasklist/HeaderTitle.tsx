import { StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useUpdateTasklistMutation } from 'hooks/tasklists'

type Props = {
  tasklistId: string
  title: string
}
const HeaderTitle = ({ tasklistId, title }: Props) => {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(title)
  const updateTasklistMutation = useUpdateTasklistMutation(tasklistId, value)
  const handleOnBlur = () => {
    updateTasklistMutation.mutate()
    setEditable(false)
  }
  const handlePress = () => setEditable(true)

  return (
    <TextInput
      editable={editable}
      style={styles.textInput}
      value={value}
      onPressIn={handlePress}
      onChangeText={setValue}
      onBlur={handleOnBlur}
    />
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  textInput: {
    width: '60%',
    fontSize: 20,
    textAlign: 'center',
  },
})
