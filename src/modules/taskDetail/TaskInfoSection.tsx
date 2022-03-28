import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDeleteTaskMutation } from 'common/hooks/tasks'
import { getCalendar } from 'utils/dateTime'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from 'common/app/hooks'

const TaskInfoSection = () => {
  const { taskDetail } = useAppSelector(state => state.tasks)
  const { selfLink, updated } = taskDetail
  const deleteTaskMutation = useDeleteTaskMutation(selfLink)
  const handleDelete = () => deleteTaskMutation.mutate()

  return (
    <View style={styles.container}>
      <Text style={styles.updateInfo}>Updated {getCalendar(updated)}</Text>
      <IconButton icon={faTrash} fn={handleDelete} />
    </View>
  )
}

export default TaskInfoSection

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    bottom: 30,
  },
  updateInfo: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
})
