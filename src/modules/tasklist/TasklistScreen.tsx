import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList, Tasklist } from 'typings'
import { routeNames } from 'shared'
import { useQuery } from 'react-query'
import tasksService from 'api/tasks'
import { TaskQuery } from 'typings/task'
import TaskItem from 'components/TaskItem'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, routeNames.Tasklist>>()
  const navigation = useNavigation()
  const { id, title } = key as Tasklist
  useLayoutEffect(() => navigation.setOptions({ title }))

  const { isLoading, error, data } = useQuery<TaskQuery, Error>(
    'tasks',
    async () => await tasksService.findAll(id),
  )
  const tasks = data?.items
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <View>
      {tasks && tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </View>
  )
}

export default TasklistScreen
