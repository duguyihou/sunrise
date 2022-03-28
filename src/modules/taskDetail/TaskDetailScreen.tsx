import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteName } from 'shared/constants'
import { useFetchTaskDetailQuery, useUpdateTaskMutation } from 'hooks/tasks'
import TaskDateTimeSection from './TaskDateTimeSection'
import TaskNotesSection from 'modules/taskDetail/TaskNotesSection'
import { RouteType } from 'typings/route'
import TaskTitleSection from './TaskTitleSection'
import TaskInfoSection from './TaskInfoSection'
import TaskSubtaskSection from './TaskSubtaskSection'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteType<RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const { isLoading, error, taskDetail } = useFetchTaskDetailQuery(selfLink)
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
