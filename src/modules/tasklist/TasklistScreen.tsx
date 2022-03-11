import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList, StackNavigationProps } from 'typings'
import { RouteName, TaskStatus, theme } from 'shared'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import HeaderTitle from 'components/HeaderTitle'
import AddTaskView from 'components/AddTaskView'
import IconButton from 'components/IconButton'
import CompletedTaskHeader from 'components/CompletedTaskHeader'

const TasklistScreen = () => {
  const {
    params: { tasklist },
  } = useRoute<RouteProp<RootStackParamList, RouteName.Tasklist>>()
  const { title, id, selfLink } = tasklist
  const navigation = useNavigation<StackNavigationProps>()
  const [modalVisible, setModalVisible] = useState(false)
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)
  const deleteTasklistMutation = useDeleteTasklistMutation(selfLink)
  const { isLoading, error, data: tasks } = useFetchTasksQuery(id)

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={title} tasklistId={id} />,
      headerRight: () => (
        <IconButton
          icon={faEllipsisH}
          fn={() => setModalVisible(!modalVisible)}
        />
      ),
    }),
  )
  const needsActionTasks = useMemo(
    () => tasks?.filter(({ status }) => status === TaskStatus.NeedsAction),
    [tasks],
  )
  const compeletedTasks = useMemo(
    () => tasks?.filter(({ status }) => status === TaskStatus.Completed),
    [tasks],
  )
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <View style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        {needsActionTasks &&
          needsActionTasks.map(task => <TaskItem key={task.id} task={task} />)}
        {compeletedTasks && compeletedTasks.length > 0 && (
          <CompletedTaskHeader
            showCompletedTasks={showCompletedTasks}
            setShowCompletedTasks={setShowCompletedTasks}
          />
        )}
        {compeletedTasks &&
          showCompletedTasks &&
          compeletedTasks.map(task => <TaskItem key={task.id} task={task} />)}
      </ScrollView>
      <PopupView visible={modalVisible} setVisible={setModalVisible}>
        <PopupItem title="delete" fn={() => deleteTasklistMutation.mutate()} />
      </PopupView>
      <AddTaskView tasklistId={id} />
    </View>
  )
}

export default TasklistScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.bg.secondary,
  },
})
