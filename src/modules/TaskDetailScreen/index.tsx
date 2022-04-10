import { useRoute } from '@react-navigation/native'
import { useFetchTaskDetailQuery } from 'hooks/tasks'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { RouteName } from 'shared/constants'
import { RouteType } from 'typings/route'

import TaskDateTimeSection from './components/TaskDateTimeSection'
import TaskInfoSection from './components/TaskInfoSection'
import TaskNotesSection from './components/TaskNotesSection'
import TaskSubtaskSection from './components/TaskSubtaskSection'
import TaskTitleSection from './components/TaskTitleSection'

function TaskDetailScreen() {
  const {
    params: { taskId, tasklistId },
  } = useRoute<RouteType<RouteName.TaskDetail>>()
  const {
    isLoading,
    error,
    data: task,
  } = useFetchTaskDetailQuery(tasklistId, taskId)

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    task && (
      <View style={styles.container}>
        <TaskTitleSection task={task} />
        <ScrollView style={styles.details}>
          <TaskDateTimeSection task={task} />
          <TaskSubtaskSection tasklistId={tasklistId} taskId={taskId} />
          <TaskNotesSection task={task} />
        </ScrollView>
        <TaskInfoSection />
      </View>
    )
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
