import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackNavigationProps } from 'typings'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from 'common/app/hooks'
import { updateTaskDetail, updateNewTask } from 'common/app/tasks'
import DateTimeText from './DateTimeText'
import { getPrevRoute } from 'utils/routes'

type Props = {
  dateTime: string
  showPlaceholder?: boolean
}

const DateTimeButton = (props: Props) => {
  const { dateTime, showPlaceholder } = props
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const { newTask, taskDetail } = useAppSelector(state => state.tasks)
  const handleSetDate = () =>
    navigation.navigate(RouteName.DateTime, { dateTime })
  const handleRemove = () => {
    if (getPrevRoute(navigation).name === RouteName.Tasklists) {
      dispatch(updateNewTask({ ...newTask, due: '' }))
    } else {
      dispatch(updateTaskDetail({ ...taskDetail, due: '' }))
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dateTime, !!dateTime && styles.placeholder]}
        onPress={handleSetDate}>
        <DateTimeText dateTime={dateTime} showPlaceholder={showPlaceholder} />
        {!!dateTime && (
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.remove}>X</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default DateTimeButton

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  dateTime: {
    flexDirection: 'row',
  },

  placeholder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
  },

  remove: {
    padding: 5,
    fontSize: 12,
  },
})
