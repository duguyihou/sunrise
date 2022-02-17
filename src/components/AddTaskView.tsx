import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { RouteName, theme } from 'shared'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()
  const [text, setText] = useState('')
  const addTaskMutation = useAddTaskMutation(tasklistId, text)

  const handleOnSubmitEditing = () => {
    if (text.trim() === '') return
    addTaskMutation.mutate()
    setText('')
  }
  const handleExpandView = () => {
    console.log('🐵 expand view')
    navigation.navigate(RouteName.NewTask, { tasklistId })
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <IconButton icon={faAngleUp} size={20} fn={handleExpandView} />
        <TextInput
          multiline
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
    backgroundColor: theme.bg.secondary,
    alignItems: 'center',
  },
  textInput: {
    padding: 20,
    fontSize: 20,
    width: '100%',
  },
})
