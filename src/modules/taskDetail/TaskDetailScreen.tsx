import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteName } from 'shared'
import { useFetchTaskDetailQuery, useUpdateTaskMutation } from 'hooks/tasks'
import TaskDateTime from 'components/TaskDateTime'
import TaskNotes from 'components/TaskNotes'
import { getCalendar } from 'utils/dateTime'
import { RouteType } from 'typings/route'
import TaskTitleSection from 'components/TaskTitleSection'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteType<RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const { isLoading, error, taskDetail } = useFetchTaskDetailQuery(selfLink)
  const { due, notes, updated } = taskDetail
  const updateTaskMutation = useUpdateTaskMutation(taskDetail)

  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <Button title="Done" onPress={handleUpdate} />,
    }),
  )

  const handleUpdate = () => updateTaskMutation.mutate()

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <View style={styles.container}>
      <TaskTitleSection />
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
