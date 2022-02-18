import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import Checkbox from 'components/Checkbox'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const addTaskMutation = useAddTaskMutation(tasklistId, { title, notes })
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
      <View style={styles.top}>
        <Checkbox onPress={() => console.log('🐵 checkbox click')} />
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={setTitle}
          placeholder="Add a Task"
          blurOnSubmit={false}
        />
      </View>
      <TextInput
        style={styles.notes}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add Notes"
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
  notes: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    fontSize: 18,
  },
})
