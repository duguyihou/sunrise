import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import TaskTitle from 'components/TaskTitle'
// import DateTimeView from 'components/DateTimeView'
import TaskNotes from 'components/TaskNotes'

const TaskDetailScreen = () => {
  const {
    params: { taskPayload },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const [task, setTask] = useState(taskPayload)
  console.log('🐵 task', task)
  return (
    <ScrollView>
      <TaskTitle task={task} setTask={setTask} />
      {/* <DateTimeView task={task} setTask={setTask} /> */}
      <TaskNotes task={task} setTask={setTask} />
    </ScrollView>
  )
}

export default TaskDetailScreen
