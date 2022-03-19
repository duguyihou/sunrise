import { faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useAddTaskMutation } from 'hooks/tasks'
import React from 'react'
import { InputAccessoryView, StyleSheet, View } from 'react-native'
import { AccessoryID, RouteName } from 'shared'
import { StackNavigationProps } from 'typings'
import IconButton from './IconButton'

type Props = {
  tasklistId: string
}
const TaskAccessory = ({ tasklistId }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()
  const addTaskMutation = useAddTaskMutation(tasklistId)

  const handleSetDateTime = () => navigation.navigate(RouteName.DateTime)
  const handleSubmit = () => addTaskMutation.mutate()
  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          icon={faCalendarCheck}
          fn={handleSetDateTime}
        />
        <IconButton style={styles.check} icon={faCheck} fn={handleSubmit} />
      </View>
    </InputAccessoryView>
  )
}

export default TaskAccessory

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  icon: {
    paddingVertical: 10,
  },
  check: {
    paddingLeft: 20,
    paddingVertical: 10,
    marginLeft: 'auto',
  },
})
