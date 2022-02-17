import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { theme } from 'shared'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const [text, setText] = useState('')
  const addTaskMutation = useAddTaskMutation(tasklistId, text)

  const handleOnSubmitEditing = () => {
    addTaskMutation.mutate()
    setText('')
  }
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Add a Task"
          blurOnSubmit={false}
          onSubmitEditing={handleOnSubmitEditing}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: theme.bg.primary,
  },
  textInput: {
    padding: 20,
    fontSize: 20,
  },
})
