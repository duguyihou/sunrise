import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import TaskItem from './components/TaskItem'
import { PopupView, PopupItem } from 'modules/common/components'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import HeaderTitle from './components/HeaderTitle'
import AddTaskSection from './components/AddTaskSection'
import IconButton from 'modules/common/components/IconButton'
import TaskHeader from './components/TaskHeader'
import { useTasks } from 'hooks/app'
import { RouteType } from 'typings/route'

const TasklistScreen = () => {
  const {
    params: { tasklist },
  } = useRoute<RouteType<RouteName.Tasklist>>()
  const { id, selfLink } = tasklist
  const navigation = useNavigation<StackNavigationProps>()
  const [modalVisible, setModalVisible] = useState(false)
  const { showCompletedTasks } = useTasks()
  const deleteTasklistMutation = useDeleteTasklistMutation(selfLink)
  const { isLoading, error, needsActionTasks, compeletedTasks } =
    useFetchTasksQuery(id)

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: () => <HeaderTitle />,
      headerRight: () => (
        <IconButton
          icon={faEllipsisH}
          onPress={() => setModalVisible(!modalVisible)}
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
      <AddTaskSection />
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
