import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList, Tasklist } from 'typings'
import { RouteName, theme } from 'shared'
import TaskItem from 'components/TaskItem'
import PopupView from 'components/PopupView'
import PopupItem from 'components/PopupItem'
import { useDeleteTasklistMutation } from 'hooks/tasklists'
import { useFetchTasksQuery } from 'hooks/tasks'
import EllipsishButton from 'components/EllipsishButton'
import HeaderTitle from 'components/HeaderTitle'
import PlusButton from 'components/PlusButton'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, RouteName.Tasklist>>()
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
    <View style={styles.container}>
      {tasks && tasks.map(task => <TaskItem key={task.id} task={task} />)}
      <PopupView visible={modalVisible} setVisible={setModalVisible}>
        <PopupItem title="delete" fn={() => deleteTasklistMutation.mutate()} />
      </PopupView>
      <View style={styles.plusWrapper}>
        <PlusButton fn={() => console.log('🐵 plus')} size={25} />
      </View>
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
  plusWrapper: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
})
