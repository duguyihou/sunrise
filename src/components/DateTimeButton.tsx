import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteName, theme } from 'shared'
import { StackNavigationProps } from 'typings'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from 'app/hooks'
import { clearNewTask } from 'app/tasks'
import DateTimeText from './DateTimeText'

type Props = {
  dateTime: string
  showPlaceholder?: boolean
}

const DateTimeButton = (props: Props) => {
  const { dateTime, showPlaceholder } = props
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const handleSetDate = () => navigation.navigate(RouteName.DateTime)
  const handleRemove = () => dispatch(clearNewTask())
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
    padding: 5,
    flexDirection: 'row',
  },

  placeholder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
  },

  remove: {
    marginLeft: 10,
    fontSize: 16,
  },
})
