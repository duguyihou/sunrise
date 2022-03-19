import { StyleSheet, View } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import DateTimeButton from './DateTimeButton'

type Props = {
  dateTime: string
}
const TaskDateTime = ({ dateTime }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton style={styles.icon} icon={faCalendarCheck} />
      <DateTimeButton dateTime={dateTime} showPlaceholder />
    </View>
  )
}

export default TaskDateTime

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 10,
    paddingVertical: 10,
  },
})
