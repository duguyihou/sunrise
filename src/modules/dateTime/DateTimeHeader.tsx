import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { updateNewTask, updateTaskDetail } from 'common/app/tasks'
import { useAppDispatch, useAppSelector } from 'common/app/hooks'
import { getPrevRoute } from 'utils/routes'
import { StackNavigationProps } from 'typings'
import { RouteName } from 'shared/constants'

type Props = {
  dateTime: string
}
const DateTimeHeader = ({ dateTime }: Props) => {
  const { newTask, taskDetail } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const navigation = useNavigation<StackNavigationProps>()

  const handleSetDateAndTime = () => {
    if (getPrevRoute(navigation).name === RouteName.Tasklist) {
      dispatch(updateNewTask({ ...newTask, due: dateTime }))
    } else {
      dispatch(updateTaskDetail({ ...taskDetail, due: dateTime }))
    }
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