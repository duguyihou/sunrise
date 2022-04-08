import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { useTasks } from 'hooks/app'
import { DateTimeButton, IconButton } from 'modules/common/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'

function TaskDateTimeSection() {
  const {
    task: { due },
  } = useTasks()
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
