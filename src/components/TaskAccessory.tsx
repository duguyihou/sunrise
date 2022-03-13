import {
  InputAccessoryView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { AccessoryID, RouteName, theme } from 'shared'
import { StackNavigationProps } from 'typings'
import { getCalendar } from 'utils/dateTime'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearTask } from 'app/tasks'

const TaskAccessory = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const { newTask } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()

  const handleSetDate = () => navigation.navigate(RouteName.DateTime)
  const handleRemove = () => dispatch(clearTask())
  const dueExist = newTask.due !== ''
  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <View style={styles.container}>
        {!dueExist && <IconButton icon={faCalendarCheck} fn={handleSetDate} />}
        {dueExist && (
          <TouchableOpacity style={styles.dateTime} onPress={handleRemove}>
            <Text>{getCalendar(newTask.due)}</Text>
          </TouchableOpacity>
        )}
      </View>
    </InputAccessoryView>
  )
}

export default TaskAccessory

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
  },
})
