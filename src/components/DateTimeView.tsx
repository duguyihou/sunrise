import { Button, StyleSheet, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { theme } from 'shared'

type Props = {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}
const DateTimeView = ({ date, setDate }: Props) => {
  const [due, setDue] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const handleConfirm = (d: Date) => {
    setOpenDatePicker(false)
    setDate(d)
    setDue(true)
  }
  const handleCancel = () => setOpenDatePicker(false)
  const handleClear = () => {
    setDue(false)
  }
  return (
    <>
      <TextInput
        editable={false}
        style={styles.dateTime}
        placeholder="Date/Time"
        value={due ? date.toString() : ''}
        onPressOut={() => setOpenDatePicker(true)}
      />
      <DatePicker
        modal
        open={openDatePicker}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {due && <Button title="X" onPress={handleClear} />}
    </>
  )
}

export default DateTimeView

const styles = StyleSheet.create({
  dateTime: {
    fontSize: 18,
    color: theme.font.primary,
    paddingHorizontal: 10,
    width: '100%',
  },
})
