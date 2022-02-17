import { InputAccessoryView, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID } from 'shared'
type Props = {
  tasklistId: string
}
const NewTaskAccessoryView = ({ tasklistId }: Props) => {
  const [text, setText] = useState('')
  const addTaskMutation = useAddTaskMutation(tasklistId, text)

  const handleOnSubmitEditing = () => {
    addTaskMutation.mutate()
    setText('')
  }

  return (
    <InputAccessoryView style={styles.container} nativeID={AccessoryID.Input}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Add a Task"
        blurOnSubmit={false}
        onSubmitEditing={handleOnSubmitEditing}
        autoFocus
      />
    </InputAccessoryView>
  )
}

export default NewTaskAccessoryView

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    width: windowWidth,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
  },
})
