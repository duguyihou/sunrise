import React from 'react'
import Checkbox from './Checkbox'
import { useUpdateTaskMutation } from 'hooks/tasks'
import Title from './Title'
import { useAppSelector } from 'app/hooks'

const TaskTitleSection = () => {
  const { taskDetail } = useAppSelector(state => state.tasks)

  const { status, title, selfLink } = taskDetail
  const updateTaskStatusMutation = useUpdateTaskMutation(selfLink, {
    ...taskDetail,
    status: !status,
  })
  const handleCheck = () => updateTaskStatusMutation.mutate()
  return (
    <Checkbox
      isChecked={status}
      onPress={handleCheck}
      textComponent={<Title />}
      text={title}
    />
  )
}

export default TaskTitleSection
