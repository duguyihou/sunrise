import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { theme } from 'shared'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateNewTask } from 'app/tasks'
import { getCalendarDayDate } from 'utils/dateTime'
import { CalendarDay } from 'typings/day'

const DateTimeScreen = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const { newTask } = useAppSelector(state => state.tasks)
  const handleGoback = () => navigation.goBack()
  const handleSetDate = (calendarDay: CalendarDay) => {
    const dateTime = getCalendarDayDate(calendarDay)
    dispatch(updateNewTask({ ...newTask, due: dateTime }))
    navigation.goBack()
  }

  return (
    <>
      <TouchableOpacity style={styles.outside} onPress={handleGoback} />
      <View style={styles.container}>
        <Calendar onDayPress={handleSetDate} />
      </View>
    </>
  )
}

export default DateTimeScreen

const styles = StyleSheet.create({
  outside: {
    width: '100%',
    height: '50%',
  },
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: theme.bg.primary,
  },
  today: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: theme.font.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
