import { ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import TaskTitle from 'components/TaskTitle'
import DateTimeView from 'components/DateTimeView'
import TaskNotes from 'components/TaskNotes'
import { useFetchTaskDetailQuery } from 'hooks/tasks'
import { TaskPayload } from 'typings/task'

const TaskDetailScreen = () => {
  const {
    params: { tasklistId, taskId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const { isLoading, error, data } = useFetchTaskDetailQuery(tasklistId, taskId)
  const [task, setTask] = useState(data as TaskPayload)
  if (isLoading && !task) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <ScrollView>
      {data && task && <TaskTitle task={task} setTask={setTask} />}
      {data && task && <DateTimeView task={task} setTask={setTask} />}
      {data && task && <TaskNotes task={task} setTask={setTask} />}
    </ScrollView>
  )
}

export default TaskDetailScreen
