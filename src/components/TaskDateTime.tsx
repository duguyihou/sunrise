import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { RouteName, theme } from 'shared'
import { StackNavigationProps } from 'typings'
import { getCalendar } from 'utils/dateTime'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearTask } from 'app/tasks'

type Props = {
  iconClickable: boolean
}
const TaskDateTime = ({ iconClickable }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()
  const {
    newTask: { due },
  } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()

  const handleSetDate = () =>
    iconClickable && navigation.navigate(RouteName.DateTime)
  const handleRemove = () => dispatch(clearTask())
  return (
    <View style={styles.container}>
      {!due && <IconButton icon={faCalendarCheck} fn={handleSetDate} />}
      {!!due && (
        <TouchableOpacity style={styles.dateTime} onPress={handleSetDate}>
          <Text>{due ? getCalendar(due) : 'Add date/time'}</Text>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.remove}>X</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default TaskDateTime

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  dateTime: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
    padding: 5,
    flexDirection: 'row',
  },

  remove: {
    marginLeft: 10,
    fontSize: 16,
  },
})
