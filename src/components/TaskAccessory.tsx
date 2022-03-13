import {
  InputAccessoryView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { AccessoryID, theme } from 'shared'
import { TaskPayload } from 'typings'
import { getCalendar } from 'utils/dateTime'

type Props = {
  taskPayload: TaskPayload
  setTaskPayload: React.Dispatch<React.SetStateAction<TaskPayload>>
}
const TaskAccessory = ({ taskPayload, setTaskPayload }: Props) => {
  const handleSetDate = () => {
    setTaskPayload({ ...taskPayload, due: new Date() })
  }

  const handleRemove = () => setTaskPayload({ ...taskPayload, due: undefined })
  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <View style={styles.container}>
        {!taskPayload.due && (
          <IconButton icon={faCalendarCheck} fn={handleSetDate} />
        )}
        {taskPayload.due && (
          <TouchableOpacity style={styles.dateTime} onPress={handleRemove}>
            <Text>{getCalendar(taskPayload.due)}</Text>
          </TouchableOpacity>
        )}
      </View>
    </InputAccessoryView>
  )
}

export default TaskAccessory

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  dateTime: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
    padding: 5,
  },
})
