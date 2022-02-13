import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { RootStackParamList, Tasklist } from 'typings'
import { routeNames, theme } from 'shared'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'

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

  const { isLoading, error, data } = useFetchTasksQuery(id)

  const mutation = useDeleteTasklistMutation(id)
  const tasks = data?.items
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <View>
      {tasks && tasks.map(task => <TaskItem key={task.id} task={task} />)}
      <PopupView visible={modalVisible} setVisible={setModalVisible}>
        <PopupItem title="delete" fn={() => mutation.mutate()} />
      </PopupView>
    </View>
  )
}

export default TasklistScreen
