import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from 'shared'
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
    console.log('🐵 value', value)
    updateTasklistMutation.mutate()
    setEditable(false)
  }
  if (!editable) {
    return (
      <View>
        <TouchableOpacity onPress={() => setEditable(true)}>
          <Text>{value}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={setValue}
      onBlur={handleOnBlur}
    />
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  textInput: {
    // flex: 1,
    backgroundColor: theme.bg.secondary,
  },
})
