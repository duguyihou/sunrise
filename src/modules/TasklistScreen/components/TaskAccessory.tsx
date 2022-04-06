import { faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useAddTaskMutation } from 'hooks/tasks'
import React from 'react'
import { InputAccessoryView, StyleSheet, View } from 'react-native'
import { AccessoryID, RouteName } from 'shared/constants'
import { StackNavigationProps } from 'typings/route'
import { IconButton } from 'modules/common/components'
import { useTasklists, useTasks } from 'hooks/app'
import { theme } from 'shared/theme'

function TaskAccessory() {
  const {
    tasklist: { id },
  } = useTasklists()
  const {
    newTask: { due, title },
  } = useTasks()
  const navigation = useNavigation<StackNavigationProps>()
  const addTaskMutation = useAddTaskMutation(id)

  const handleSetDateTime = () =>
    navigation.navigate(RouteName.DateTime, { dateTime: due })
  const handleSubmit = () => !!title && addTaskMutation.mutate()
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
          color={title && theme.button.enabled}
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
