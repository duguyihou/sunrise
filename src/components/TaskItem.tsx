import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { StackNavigationProps, Task } from 'typings'
import Checkbox from './Checkbox'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { RouteName, TaskStatus } from 'shared'
import { useNavigation } from '@react-navigation/native'
import { windowWidth } from 'utils/dimensions'
import TaskItemDue from './TaskItemDue'
import TaskItemNotes from './TaskItemNotes'
import TaskItemTitle from './TaskItemTitle'

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  const { title, selfLink, status, due, notes } = task
  const navigation = useNavigation<StackNavigationProps>()
  const isChecked = status === TaskStatus.Completed
  const updateTaskStatusMutation = useUpdateTaskMutation(selfLink, {
    ...task,
    status: !isChecked ? TaskStatus.Completed : TaskStatus.NeedsAction,
  })
  const handleCheck = () => updateTaskStatusMutation.mutate()
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => navigation.push(RouteName.TaskDetail, { selfLink })}>
      <Checkbox
        isChecked={isChecked}
        onPress={handleCheck}
        disableText={true}
      />
      <View style={styles.task}>
        <TaskItemTitle isChecked={isChecked} title={title} />
        {notes && <TaskItemNotes notes={notes} />}
        {due && <TaskItemDue due={due} />}
      </View>
    </TouchableOpacity>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  task: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
})
