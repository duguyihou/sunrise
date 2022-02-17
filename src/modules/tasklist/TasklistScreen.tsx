import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList, StackNavigationProps, Tasklist } from 'typings'
import { RouteName, theme } from 'shared'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import EllipsishButton from 'components/EllipsishButton'
import HeaderTitle from 'components/HeaderTitle'
import AddTaskView from 'components/AddTaskView'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, RouteName.Tasklist>>()
  const navigation = useNavigation<StackNavigationProps>()
  const { id, title } = key as Tasklist
  const [modalVisible, setModalVisible] = useState(false)
  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={title} tasklistId={id} />,
      headerRight: () => (
        <EllipsishButton fn={() => setModalVisible(!modalVisible)} />
      ),
    }),
  )

  const deleteTasklistMutation = useDeleteTasklistMutation(id)
  const { isLoading, error, data } = useFetchTasksQuery(id)
  const tasks = data?.items

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <View style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        {tasks &&
          tasks.map(task => (
            <TaskItem key={task.id} task={task} tasklistId={id} />
          ))}
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
