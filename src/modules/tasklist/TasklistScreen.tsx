import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { RootStackParamList, Tasklist } from 'typings'
import { routeNames, theme, queryKey } from 'shared'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import tasksService from 'api/tasks'
import { TaskQuery } from 'typings/task'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import tasklistService from 'api/tasklists'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, routeNames.Tasklist>>()
  const navigation = useNavigation()
  const { id, title } = key as Tasklist
  const [modalVisible, setModalVisible] = useState(false)
  useLayoutEffect(() =>
    navigation.setOptions({
      title,
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <FontAwesomeIcon icon={faEllipsisH} color={theme.font.primary} />
        </TouchableOpacity>
      ),
    }),
  )

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery<TaskQuery, Error>(
    'tasks',
    async () => await tasksService.findAll(id),
  )

  const mutation = useMutation(
    (tasklistId: string) => tasklistService.deleteById(tasklistId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.tasklists)
        navigation.goBack()
      },
    },
  )
  const tasks = data?.items
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <View>
      {tasks && tasks.map(task => <TaskItem key={task.id} task={task} />)}
      <PopupView visible={modalVisible} setVisible={setModalVisible}>
        <PopupItem title="delete" fn={() => mutation.mutate(id)} />
      </PopupView>
    </View>
  )
}

export default TasklistScreen
