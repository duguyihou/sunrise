import { useNavigation } from '@react-navigation/native'
import { updateTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackNavigationProps } from 'typings/route'

import DateTimeText from './DateTimeText'

type Props = {
  dateTime: string
  showPlaceholder?: boolean
}

function DateTimeButton(props: Props) {
  const { dateTime, showPlaceholder } = props
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const task = useTasks()
  const handleSetDate = () =>
    navigation.navigate(RouteName.DateTime, { dateTime })
  const handleRemove = () => dispatch(updateTask({ ...task, due: '' }))

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
