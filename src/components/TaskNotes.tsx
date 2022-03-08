import React from 'react'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import { theme } from 'shared'
import IconButton from './IconButton'

type Props = {
  value: string | undefined
  onChange: (...event: unknown[]) => void
}
const TaskNotes = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton icon={faAlignLeft} />
      <TextInput
        multiline
        style={styles.notes}
        value={value}
        onChangeText={onChange}
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
