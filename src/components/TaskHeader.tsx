import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { theme } from 'shared'
import { useAppDispatch } from 'app/hooks'
import { toggleShowCompletedTasks } from 'app/tasks'

type Props = {
  title: string
}
const TaskHeader = ({ title }: Props) => {
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
    fontSize: 16,
    padding: 5,
    borderColor: theme.font.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.font.placeholder,
  },
})