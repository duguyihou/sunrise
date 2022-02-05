import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackProps } from 'typings'
import { windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  return (
    <View style={styles.container}>
      <TasklistItem navigation={navigation} route={route} />
    </View>
  )
}

export default TasklistsScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
})
