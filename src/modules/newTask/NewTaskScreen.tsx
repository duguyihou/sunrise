import { StyleSheet, View } from 'react-native'
import React from 'react'
import NewTaskView from 'components/NewTaskView'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'

const NewTaskScreen = () => {
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()
  return (
    <View style={styles.container}>
      <NewTaskView tasklistId={tasklistId} />
    </View>
  )
}

export default NewTaskScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})
