import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { windowWidth, windowHeight } from 'utils/dimensions'
import Checkbox from './Checkbox'
import { useAddTaskMutation } from 'hooks/tasks'
type Props = {
  tasklistId: string
}
const NewTaskView = ({ tasklistId }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const [text, setText] = useState('')
  const addTaskMutation = useAddTaskMutation(tasklistId, text)
  const handleCheck = () => {
    setIsChecked(!isChecked)
  }
  const handleOnSubmitEditing = () => {
    addTaskMutation.mutate()
    setText('')
  }

  return (
    <View style={styles.container}>
      <Checkbox isChecked={isChecked} onPress={handleCheck} />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Add a Task"
        blurOnSubmit={false}
        onSubmitEditing={handleOnSubmitEditing}
        autoFocus
      />
    </View>
  )
}

export default NewTaskView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 2,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textInput: {
    fontSize: 20,
  },
})
