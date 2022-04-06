import TouchableOpacitySection from 'modules/common/components/TouchableOpacitySection'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { theme } from 'shared/theme'
import { CalendarDay } from 'typings/day'
import { getCalendarDayDate } from 'utils/dateTime'

import DateTimeHeader from './DateTimeHeader'

type Props = {
  dateTime: string
}
function DateTimeScreen({ dateTime }: Props) {
  const [due, setDue] = useState(dateTime)
  const [showCalendar, setShowCalendar] = useState(true)

  const handleSetDate = (calendarDay: CalendarDay) =>
    setDue(getCalendarDayDate(calendarDay))

  const hanldeShowCalendar = () => setShowCalendar(false)
  return (
    <>
      <TouchableOpacitySection />
      <View style={styles.container}>
        <DateTimeHeader dateTime={due} />
        <>
          {!showCalendar && (
            <TouchableOpacity onPress={hanldeShowCalendar}>
              <Text>{due}</Text>
            </TouchableOpacity>
          )}
          {showCalendar && <Calendar onDayPress={handleSetDate} />}
        </>
      </View>
    </>
  )
}

export default DateTimeScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    backgroundColor: theme.bg.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
