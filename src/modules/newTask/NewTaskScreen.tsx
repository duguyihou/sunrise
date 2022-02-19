import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { RootStackParamList } from 'typings'
import { RouteName, theme } from 'shared'
import DatePicker from 'react-native-date-picker'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [due, setDue] = useState(new Date())
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const addTaskMutation = useAddTaskMutation(tasklistId, { title, notes, due })
  const handleSaveTask = () => {
    addTaskMutation.mutate()
    navigation.goBack()
  }
  const handleDismiss = () => navigation.goBack()
  const handleShowDateTimeModal = () => setOpenDatePicker(true)

  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => <IconButton icon={faAngleDown} fn={handleDismiss} />,
      headerRight: () => <IconButton icon={faCheck} fn={handleSaveTask} />,
    }),
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={setTitle}
          placeholder="Add a Task"
          blurOnSubmit={false}
        />
      </View>
      <TextInput
        style={styles.dateTime}
        value={due.toString()}
        placeholder="Date/Time"
        blurOnSubmit={false}
        onFocus={handleShowDateTimeModal}
      />
      <DatePicker
        modal
        open={openDatePicker}
        date={due}
        onConfirm={date => {
          setOpenDatePicker(false)
          setDue(date)
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
      />

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
  top: {
    width: windowWidth,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingVertical: 20,
    fontSize: 20,
  },
  dateTime: {
    fontSize: 18,
    color: theme.font.primary,
    paddingHorizontal: 10,
    width: '100%',
  },
  notes: {
    paddingHorizontal: 10,
    fontSize: 18,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: theme.border,
  },
})
