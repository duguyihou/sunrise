import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { RouteName, theme } from 'shared'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateNewTask, updateTask } from 'app/tasks'
import { getCalendarDayDate } from 'utils/dateTime'
import { CalendarDay } from 'typings/day'
import { getPrevRoute } from 'utils/routes'

const DateTimeScreen = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const { newTask, task } = useAppSelector(state => state.tasks)

  const handleGoback = () => navigation.goBack()
  const handleSetDate = (calendarDay: CalendarDay) => {
    const dateTime = getCalendarDayDate(calendarDay)
    if (getPrevRoute(navigation).name === RouteName.Tasklist) {
      dispatch(updateNewTask({ ...newTask, due: dateTime }))
    } else {
      dispatch(updateTask({ ...task, due: dateTime }))
    }
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
