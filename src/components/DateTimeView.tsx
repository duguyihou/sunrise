import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

type Props = {
  value: Date | undefined
  onChange: (...event: unknown[]) => void
}
const DateTimeView = ({ value, onChange }: Props) => {
  return (
    <TextInput
      style={styles.dateTime}
      placeholder="Date/Time"
      value={value?.toString()}
      onChange={onChange}
    />
  )
}

export default DateTimeView

const styles = StyleSheet.create({
  dateTime: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
  },
})
