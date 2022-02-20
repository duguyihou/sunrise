import { Button, StyleSheet, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { theme } from 'shared'
import { windowWidth } from 'utils/dimensions'
import { getDue } from 'utils/dateTime'
import { TaskPayload } from 'typings/task'

type Props = {
  task: TaskPayload
  setTask: Dispatch<SetStateAction<TaskPayload>>
}
const DateTimeView = ({ task, setTask }: Props) => {
  const [due, setDue] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const handleConfirm = (d: Date) => {
    setOpenDatePicker(false)
    setTask({ ...task, due: d })
    setDue(true)
  }
  const handleCancel = () => setOpenDatePicker(false)
  const handleClear = () => setDue(false)

  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        style={styles.dateTime}
        placeholder="Date/Time"
        value={due ? getDue(task.due as Date) : ''}
        onPressOut={() => setOpenDatePicker(true)}
      />
      {due && <Button title="X" onPress={handleClear} />}
      <DatePicker
        modal
        open={openDatePicker}
        date={task.due as Date}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  )
}

export default DateTimeView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 18,
    color: theme.font.primary,
    paddingHorizontal: 10,
    width: '50%',
  },
})
