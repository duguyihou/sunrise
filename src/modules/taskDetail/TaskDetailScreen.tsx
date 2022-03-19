import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useDeleteTaskMutation, useFetchTaskDetailQuery } from 'hooks/tasks'
import TaskDateTime from 'components/TaskDateTime'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import TaskInfo from 'components/TaskInfo'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
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
      <TaskInfo updated={updated} />
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
})
