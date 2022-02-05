import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'typings'
import { windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'

const TasklistsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList>) => {
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
