import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { theme } from 'shared/theme'
import { useAppDispatch } from 'hooks/app'
import { toggleShowCompletedTasks } from 'app/tasksSlice'

type Props = {
  title: string
}
function TaskHeader({ title }: Props) {
  const dispatch = useAppDispatch()
  const toggle = () => dispatch(toggleShowCompletedTasks())
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={toggle}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskHeader

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    padding: 5,
    borderColor: theme.font.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.font.placeholder,
  },
})
