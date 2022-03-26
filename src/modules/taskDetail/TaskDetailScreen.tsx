import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteName } from 'shared'
import { useDeleteTaskMutation, useFetchTaskDetailQuery } from 'hooks/tasks'
import TaskDateTime from 'components/TaskDateTime'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getCalendar } from 'utils/dateTime'
import { RouteType } from 'typings/route'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteType<RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const { isLoading, error, task } = useFetchTaskDetailQuery(selfLink)
  const { title, due, notes, updated } = task
  const deleteTaskMutation = useDeleteTaskMutation(selfLink)

  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faTrash} fn={handleDelete} />,
    }),
  )

  const handleDelete = () => deleteTaskMutation.mutate()

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <View style={styles.container}>
      <TaskTitle title={title} />
      <ScrollView style={styles.details}>
        <TaskDateTime dateTime={due} />
        <TaskNotes notes={notes} />
      </ScrollView>
      <Text style={styles.updateInfo}>Updated {getCalendar(updated)}</Text>
    </View>
  )
}

export default TaskDetailScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  details: {
    flex: 1,
  },
  updateInfo: {
    fontSize: 12,
    textAlign: 'center',
    bottom: 30,
  },
})
