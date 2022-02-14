import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NewTaskView from 'components/NewTaskView'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { windowHeight, windowWidth } from 'utils/dimensions'

const NewTaskScreen = () => {
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()
  const navigation = useNavigation()
  const handleDismiss = () => navigation.goBack()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.outside} onPress={handleDismiss} />
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
    backgroundColor: 'transparent',
  },
  outside: {
    width: windowWidth,
    height: windowHeight / 2,
  },
})
