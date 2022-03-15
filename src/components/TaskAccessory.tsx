import React from 'react'
import { InputAccessoryView } from 'react-native'
import { AccessoryID } from 'shared'
import TaskDateTime from './TaskDateTime'

const TaskAccessory = () => {
  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <TaskDateTime iconClickable={true} />
    </InputAccessoryView>
  )
}

export default TaskAccessory
