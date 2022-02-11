import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { routeNames } from 'shared'

const TasklistScreen = () => {
  const {
    params: { path },
  } = useRoute<RouteProp<RootStackParamList, routeNames.Tasklists>>()
  console.log('🐵', path)
  return (
    <View>
      <Text>inbox</Text>
    </View>
  )
}

export default TasklistScreen
