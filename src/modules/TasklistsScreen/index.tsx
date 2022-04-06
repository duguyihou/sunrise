import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useAddTasklistMutation } from 'hooks/tasklists'
import { IconButton } from 'modules/common/components'
import React, { useLayoutEffect } from 'react'
import { StackNavigationProps } from 'typings/route'

import TasklistSection from './components/TasklistSection'

function TasklistsScreen() {
  const navigation = useNavigation<StackNavigationProps>()
  const addTasklistMutation = useAddTasklistMutation()
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faPlus} onPress={handlePlus} />,
    }),
  )
  const handlePlus = () => addTasklistMutation.mutate()

  return <TasklistSection />
}

export default TasklistsScreen
