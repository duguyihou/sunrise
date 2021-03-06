import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { DateTimeButton, IconButton } from 'modules/common/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Task } from 'typings/task'

type Props = {
  task: Task
}
function TaskDateTimeSection({ task }: Props) {
  const { due } = task
  return (
    <View style={styles.container}>
      <IconButton style={styles.icon} icon={faCalendarCheck} />
      <DateTimeButton dateTime={due} showPlaceholder />
    </View>
  )
}

export default TaskDateTimeSection

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
