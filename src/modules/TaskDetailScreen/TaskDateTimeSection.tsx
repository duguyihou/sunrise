import { StyleSheet, View } from 'react-native'
import React from 'react'
import IconButton from 'modules/common/components/IconButton'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { DateTimeButton } from 'modules/common/components'
import { useAppSelector } from 'redux/hooks'

const TaskDateTimeSection = () => {
  const { taskDetail } = useAppSelector(state => state.tasks)
  const { due } = taskDetail
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
