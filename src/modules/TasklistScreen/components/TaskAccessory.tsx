import { faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useAddTaskMutation } from 'hooks/tasks'
import React from 'react'
import { InputAccessoryView, StyleSheet, View } from 'react-native'
import { AccessoryID, RouteName } from 'shared/constants'
import { StackNavigationProps } from 'typings'
import { IconButton } from 'modules/common/components'
import { useTasklists, useTasks } from 'app/hooks'

const TaskAccessory = () => {
  const {
    tasklist: { id },
  } = useTasklists()
  const {
    newTask: { due },
  } = useTasks()
  const navigation = useNavigation<StackNavigationProps>()
  const addTaskMutation = useAddTaskMutation(id)

  const handleSetDateTime = () =>
    navigation.navigate(RouteName.DateTime, { dateTime: due })
  const handleSubmit = () => addTaskMutation.mutate()
  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          icon={faCalendarCheck}
          onPress={handleSetDateTime}
        />
        <IconButton
          style={styles.check}
          icon={faCheck}
          onPress={handleSubmit}
        />
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
