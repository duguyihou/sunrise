import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { getCalendar } from 'utils/dateTime'
import IconButton from './IconButton'

type Props = {
  value: Date
  onChange: (...event: unknown[]) => void
}
const TaskDateTime = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton icon={faCalendarCheck} />
      <TextInput
        style={styles.dateTime}
        placeholder="Date/Time"
        value={getCalendar(value)}
        onChange={onChange}
      />
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
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})
