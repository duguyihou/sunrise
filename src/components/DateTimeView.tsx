import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker'

import { theme } from 'shared'
import { windowWidth } from 'utils/dimensions'
import { UseFormSetValue } from 'react-hook-form'

type Props = {
  value: Date | undefined
  setValue: UseFormSetValue<{
    title?: string | undefined
    notes?: string | undefined
    due?: Date | undefined
  }>
}
const DateTimeView = ({ value, setValue }: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  return (
    <View style={styles.container}>
      {value && (
        <TextInput
          style={styles.dateTime}
          placeholder="Date/Time"
          value={value.toString()}
          onFocus={() => setShowDatePicker(true)}
        />
      )}
      {value && (
        <DatePicker
          modal
          mode="date"
          open={showDatePicker}
          date={new Date(value)}
          onDateChange={date => setValue('due', date)}
        />
      )}
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
