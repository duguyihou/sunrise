import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTasks } from 'hooks/app'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import { PopupItem, PopupView } from 'modules/common/components'
import IconButton from 'modules/common/components/IconButton'
import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { RouteName } from 'shared/constants'
import { RouteType, StackNavigationProps } from 'typings/route'

import AddTaskSection from './components/AddTaskSection'
import HeaderTitle from './components/HeaderTitle'
import TaskHeader from './components/TaskHeader'
import TaskItem from './components/TaskItem'

function TasklistScreen() {
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
      <ScrollView style={styles.tasks} keyboardDismissMode="on-drag">
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
  },
  tasks: {
    width: '100%',
  },
})
