import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { routeNames } from 'shared'

const TasklistScreen = () => {
  const {
    params: { key },
  } = useRoute<RouteProp<RootStackParamList, routeNames.Tasklists>>()
  const navigation = useNavigation()
  useLayoutEffect(() =>
    navigation.setOptions({
      title: key.title,
    }),
  )
  return (
    <View>
      <Text>{key.title}</Text>
    </View>
  )
}

export default TasklistScreen
