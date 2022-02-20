import { ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { RootStackParamList } from 'typings'
import { RouteName, theme } from 'shared'
import DateTimeView from 'components/DateTimeView'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [due, setDue] = useState(false)
  const [date, setDate] = useState(new Date())
  const addTaskMutation = useAddTaskMutation(tasklistId, {
    title,
    notes,
    due: date,
  })
  const handleSaveTask = () => {
    addTaskMutation.mutate()
    navigation.goBack()
  }
  const handleDismiss = () => navigation.goBack()

  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => <IconButton icon={faAngleDown} fn={handleDismiss} />,
      headerRight: () => <IconButton icon={faCheck} fn={handleSaveTask} />,
    }),
  )

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder="Add a Task"
        blurOnSubmit={false}
      />
      <DateTimeView due={due} setDue={setDue} date={date} setDate={setDate} />
      <TextInput
        style={styles.notes}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add Note"
        blurOnSubmit={false}
        multiline
      />
    </ScrollView>
  )
}

export default NewTaskScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
  },
  notes: {
    paddingHorizontal: 10,
    fontSize: 18,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: theme.border,
  },
})
