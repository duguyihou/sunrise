import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigationProps, Task } from 'typings'
import Checkbox from './Checkbox'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { RouteName, theme } from 'shared'
import { useNavigation } from '@react-navigation/native'
import { windowWidth } from 'utils/dimensions'
import DateTimeText from './DateTimeText'

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  const { title, selfLink, status, due, notes } = task
  const navigation = useNavigation<StackNavigationProps>()

  const updateTaskStatusMutation = useUpdateTaskMutation(selfLink, {
    ...task,
    status: !status,
  })
  const handleCheck = () => updateTaskStatusMutation.mutate()
  const navigateToTaskDetail = () =>
    navigation.push(RouteName.TaskDetail, { selfLink })
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={navigateToTaskDetail}>
      <Checkbox isChecked={status} onPress={handleCheck} />
      <View style={styles.task}>
        <Text
          numberOfLines={1}
          style={[styles.needsActionTitle, status && styles.completedTitle]}>
          {title}
        </Text>
        {notes && (
          <Text numberOfLines={2} style={styles.notes}>
            {notes}
          </Text>
        )}
        {due && <DateTimeText dateTime={due} style={styles.dateTimeText} />}
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
  },
  needsActionTitle: {
    fontSize: 16,
  },
  completedTitle: {
    color: theme.font.placeholder,
    textDecorationLine: 'line-through',
  },
  dateTimeText: {
    fontSize: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
    marginTop: 4,
  },
  notes: {
    color: theme.font.placeholder,
    paddingVertical: 5,
    marginTop: 4,
  },
})
