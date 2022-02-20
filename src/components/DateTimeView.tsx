import { StyleSheet, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { theme } from 'shared'

type Props = {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  due: boolean
  setDue: Dispatch<SetStateAction<boolean>>
}
const DateTimeView = ({ date, setDate, due, setDue }: Props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const handleShowDateTimeModal = () => setOpenDatePicker(true)
  console.log('🐵 due', due)
  return (
    <>
      {!due && (
        <TextInput
          style={styles.dateTime}
          value={''}
          placeholder="Date/Time"
          blurOnSubmit={false}
          onFocus={() => setDue(true)}
        />
      )}
      {due && (
        <>
          <TextInput
            style={styles.dateTime}
            value={date.toString()}
            placeholder="Date/Time"
            blurOnSubmit={false}
            onFocus={handleShowDateTimeModal}
          />
          <DatePicker
            modal
            open={openDatePicker}
            date={date}
            onConfirm={d => {
              setOpenDatePicker(false)
              setDate(d)
            }}
            onCancel={() => setOpenDatePicker(false)}
          />
        </>
      )}
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
