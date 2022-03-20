import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { theme } from 'shared'
import { getCalendarDayDate } from 'utils/dateTime'
import { CalendarDay } from 'typings/day'
import DateTimeHeader from 'components/DateTimeHeader'

const DateTimeScreen = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const [due, setDue] = useState('')
  const handleGoback = () => navigation.goBack()
  const handleSetDate = (calendarDay: CalendarDay) =>
    setDue(getCalendarDayDate(calendarDay))

  return (
    <>
      <TouchableOpacity style={styles.outside} onPress={handleGoback} />
      <View style={styles.container}>
        <DateTimeHeader dateTime={due} />
        <Calendar onDayPress={handleSetDate} />
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
