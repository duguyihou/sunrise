import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { theme } from 'shared'
import DateTimeHeader from 'components/DateTimeHeader'
import { Calendar } from 'react-native-calendars'
import { CalendarDay } from 'typings/day'
import { getCalendarDayDate } from 'utils/dateTime'

type Props = {
  dateTime: string
}
const DateTimeScreen = ({ dateTime }: Props) => {
  const [due, setDue] = useState(dateTime)
  const [showCalendar, setShowCalendar] = useState(true)
  const navigation = useNavigation<StackNavigationProps>()

  const handleGoback = () => navigation.goBack()
  const handleSetDate = (calendarDay: CalendarDay) =>
    setDue(getCalendarDayDate(calendarDay))

  const hanldeShowCalendar = () => setShowCalendar(false)
  return (
    <>
      <TouchableOpacity style={styles.outside} onPress={handleGoback} />
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
  outside: {
    width: '100%',
    height: '40%',
  },
  container: {
    width: '100%',
    height: '60%',
    backgroundColor: theme.bg.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
