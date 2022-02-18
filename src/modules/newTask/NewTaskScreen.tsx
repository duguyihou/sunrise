import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon={faAngleDown} fn={() => navigation.goBack()} />
      ),
    }),
  )
  return (
    <View>
      <Text>NewTaskScreen</Text>
    </View>
  )
}

export default NewTaskScreen

const styles = StyleSheet.create({})
