import { useNavigation } from '@react-navigation/native'
import { updateTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigationProps } from 'typings/route'

type Props = {
  dateTime: string
}
function DateTimeHeader({ dateTime }: Props) {
  const task = useTasks()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<StackNavigationProps>()

  const handleSetDateAndTime = () => {
    dispatch(updateTask({ ...task, due: dateTime }))
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date and time</Text>
      <TouchableOpacity style={styles.done} onPress={handleSetDateAndTime}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DateTimeHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  done: {
    padding: 10,
    right: 0,
    zIndex: 10,
    position: 'absolute',
  },
})
