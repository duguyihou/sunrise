import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID, theme } from 'shared'
import TaskAccessory from './TaskAccessory'
import DateTimeButton from './DateTimeButton'
import { useKeyboard } from 'shared/useKeyboard'
import { Controller } from 'react-hook-form'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const {
    addTaskMutation,
    useFormState: { getValues, control, handleSubmit },
  } = useAddTaskMutation(tasklistId)
  const isKeyboardOpen = useKeyboard()
  const showDateTimeButton = () => !!getValues('due') && isKeyboardOpen
  const onSubmit = () => addTaskMutation.mutate()

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <Controller
          name="title"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.title}
              value={value}
              onChangeText={onChange}
              placeholder="Add a Task"
              inputAccessoryViewID={AccessoryID.Task}
              blurOnSubmit={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
        {showDateTimeButton() && (
          <Controller
            name="due"
            control={control}
            render={({ field: { value } }) => (
              <DateTimeButton dateTime={value} />
            )}
          />
        )}
      </View>
      <TaskAccessory />
    </KeyboardAvoidingView>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 50,
  },
  container: {
    width: windowWidth,
    backgroundColor: theme.bg.secondary,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    paddingVertical: 8,
    fontSize: 20,
    width: '100%',
  },
})
