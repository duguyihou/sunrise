import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteName, theme } from 'shared'
import { StackNavigationProps } from 'typings'
import { getCalendar } from 'utils/dateTime'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from 'app/hooks'
import { clearTask } from 'app/tasks'

type Props = {
  dateTime: string
}

const DateTime = ({ dateTime }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  dateTime = new Date().toISOString()
  const handleSetDate = () => navigation.navigate(RouteName.DateTime)
  const handleRemove = () => dispatch(clearTask())
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateTime} onPress={handleSetDate}>
        <Text>{dateTime ? getCalendar(dateTime) : 'Add date/time'}</Text>
        {!!dateTime && (
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.remove}>X</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default DateTime

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
