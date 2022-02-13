import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList, Tasklist } from 'typings'
import { routeName } from 'shared'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import EllipsishButton from 'components/EllipsishButton'
import HeaderTitle from 'components/HeaderTitle'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, routeName.Tasklist>>()
  const navigation = useNavigation()
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
    <View>
      {tasks && tasks.map(task => <TaskItem key={task.id} task={task} />)}
      <PopupView visible={modalVisible} setVisible={setModalVisible}>
        <PopupItem title="delete" fn={() => deleteTasklistMutation.mutate()} />
      </PopupView>
    </View>
  )
}

export default TasklistScreen
