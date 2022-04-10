import { useUpdateTasklistMutation } from 'hooks/tasklists'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from 'shared/theme'

type Props = {
  header: {
    id: string
    title: string
  }
}
function HeaderTitle({ header }: Props) {
  const { id, title } = header
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(title)
  const updateTasklistMutation = useUpdateTasklistMutation(id, value)
  const handleOnBlur = () => {
    if (value !== title) updateTasklistMutation.mutate()
    setEditable(false)
  }
  const handlePress = () => setEditable(true)

  return (
    <TextInput
      editable={editable}
      style={[styles.input, editable && styles.editableInput]}
      value={value}
      onPressIn={handlePress}
      onChangeText={setValue}
      onBlur={handleOnBlur}
    />
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  input: {
    width: '60%',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  editableInput: {
    backgroundColor: theme.bg.secondary,
  },
})
