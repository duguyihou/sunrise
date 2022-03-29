import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { StackNavigationProps } from 'typings'
import { useAddTasklistMutation } from 'hooks/tasklists'
import { IconButton } from 'modules/common/components'
import TasklistSection from './components/TasklistSection'

const TasklistsScreen = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const addTasklistMutation = useAddTasklistMutation()
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faPlus} onPress={handlePlus} />,
    }),
  )
  const handlePlus = () => addTasklistMutation.mutate()

  return (
    <>
      <TasklistSection />
    </>
  )
}

export default TasklistsScreen
