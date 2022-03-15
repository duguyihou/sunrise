import React from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { UseFormSetValue } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from 'shared'
import { getCalendar } from 'utils/dateTime'
import IconButton from './IconButton'
import { TaskPayload } from 'typings'

type Props = {
  date: string
  setValue: UseFormSetValue<TaskPayload>
}
const TaskDateTime = ({ date, setValue }: Props) => {
  const handleRemove = () => setValue('due', '')
  const handleShowModal = () => setValue('due', new Date().toISOString())
  return (
    <View style={styles.container}>
      <IconButton icon={faCalendarCheck} />
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.dateTime, !!date && styles.dateExist]}
        onPress={handleShowModal}>
        <Text> {date ? getCalendar(date) : 'Add date'}</Text>
        {!!date && (
          <TouchableOpacity style={styles.remove} onPress={handleRemove}>
            <Text>x</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default TaskDateTime

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  dateTime: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateExist: {
    borderColor: theme.border.secondary,
    borderRadius: 10,
    borderWidth: 1,
  },
  remove: {
    marginLeft: 10,
  },
})
