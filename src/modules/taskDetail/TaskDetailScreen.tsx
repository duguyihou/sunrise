import { ScrollView, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useDeleteTaskMutation, useFetchTaskDetailQuery } from 'hooks/tasks'
import TaskTitle from 'components/TaskTitle'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTask } from 'app/tasks'
import TaskNotes from 'components/TaskNotes'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useFetchTaskDetailQuery(selfLink)
  const deleteTaskMutation = useDeleteTaskMutation(selfLink)
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faTrash} fn={handleDelete} />,
    }),
  )
  const { task } = useAppSelector(state => state.tasks)
  const { title, notes } = task
  const handleDelete = () => deleteTaskMutation.mutate()
  const onChangeTitle = (text: string) =>
    dispatch(updateTask({ ...task, title: text }))
  const onChangeNotes = (text: string) =>
    dispatch(updateTask({ ...task, notes: text }))
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <ScrollView>
      <TaskTitle value={title} onChangeTitle={onChangeTitle} />
      <TaskNotes value={notes} onChangeNotes={onChangeNotes} />
    </ScrollView>
  )
}

export default TaskDetailScreen
