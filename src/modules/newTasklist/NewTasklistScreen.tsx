import { Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import HeaderTitle from 'components/HeaderTitle'
import { RootStackParamList } from 'typings'
import { routeName } from 'shared'

const NewTasklistScreen = () => {
  const {
    params: { title },
  } = useRoute<RouteProp<RootStackParamList, routeName.NewTasklist>>()
  const navigation = useNavigation()
  // useLayoutEffect(() =>
  //   navigation.setOptions({ headerTitle: () => <HeaderTitle title={title}  /> }),
  // )
  return (
    <View>
      <Text>NewTasklistScreen</Text>
    </View>
  )
}

export default NewTasklistScreen
