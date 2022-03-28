import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import TaskItem from './TaskItem'
import { PopupView, PopupItem } from 'modules/common/components'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import HeaderTitle from './HeaderTitle'
import AddTaskView from './AddTaskView'
import IconButton from 'modules/common/components/IconButton'
import TaskHeader from './TaskHeader'
import { useAppSelector } from 'common/app/hooks'
import { RouteType } from 'typings/route'

const TasklistScreen = () => {
  const {
    params: { tasklist },
  } = useRoute<RouteType<RouteName.Tasklist>>()
  const { title, id, selfLink } = tasklist
  const navigation = useNavigation<StackNavigationProps>()
  const [modalVisible, setModalVisible] = useState(false)
  const { showCompletedTasks } = useAppSelector(state => state.tasks)
  const deleteTasklistMutation = useDeleteTasklistMutation(selfLink)
  const { isLoading, error, needsActionTasks, compeletedTasks } =
    useFetchTasksQuery(id)

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
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <View style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        {needsActionTasks &&
          needsActionTasks.map(task => <TaskItem key={task.id} task={task} />)}
        {compeletedTasks && compeletedTasks.length > 0 && (
          <TaskHeader title="Completed" />
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
