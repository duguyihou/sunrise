import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { getCalendar } from 'utils/dateTime'

type Props = {
  value: Date
  onChange: (...event: unknown[]) => void
}
const DateTimeView = ({ value, onChange }: Props) => {
  return (
    <TextInput
      style={styles.dateTime}
      placeholder="Date/Time"
      value={getCalendar(value)}
      onChange={onChange}
    />
  )
}

export default DateTimeView

const styles = StyleSheet.create({
  dateTime: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})
