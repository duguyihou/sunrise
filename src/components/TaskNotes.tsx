import React from 'react'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { theme } from 'shared'
import IconButton from './IconButton'
import { updateTask } from 'app/tasks'

type Props = {
  notes: string
}
const TaskNotes = ({ notes }: Props) => {
  const dispatch = useAppDispatch()
  const { task } = useAppSelector(state => state.tasks)
  const handleOnChange = (text: string) =>
    dispatch(updateTask({ ...task, notes: text }))
  return (
    <View style={styles.container}>
      <IconButton icon={faAlignLeft} />
      <TextInput
        multiline
        style={styles.notes}
        value={notes}
        onChangeText={handleOnChange}
        placeholder="Add Notes"
        blurOnSubmit={false}
      />
    </View>
  )
}

export default TaskNotes

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  notes: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    color: theme.font.placeholder,
  },
})
