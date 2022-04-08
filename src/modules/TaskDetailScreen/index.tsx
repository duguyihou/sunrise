import { useNavigation, useRoute } from '@react-navigation/native'
import { useFetchTaskDetailQuery, useUpdateTaskMutation } from 'hooks/tasks'
import React, { useLayoutEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RouteName } from 'shared/constants'
import { RouteType } from 'typings/route'

import TaskDateTimeSection from './components/TaskDateTimeSection'
import TaskInfoSection from './components/TaskInfoSection'
import TaskNotesSection from './components/TaskNotesSection'
import TaskSubtaskSection from './components/TaskSubtaskSection'
import TaskTitleSection from './components/TaskTitleSection'

function TaskDetailScreen() {
  const {
    params: { selfLink },
  } = useRoute<RouteType<RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const { isLoading, error, task } = useFetchTaskDetailQuery(selfLink)
  const updateTaskMutation = useUpdateTaskMutation(task)
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
        <TaskDateTimeSection />
        <TaskSubtaskSection />
        <TaskNotesSection />
      </ScrollView>
      <TaskInfoSection />
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
