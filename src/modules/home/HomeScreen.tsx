import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from 'app/hooks'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>
const HomeScreen = ({ navigation }: Props) => {
  const events = useAppSelector(state => state.events)
  return (
    <View style={styles.container}>
      {events && events.map(e => <Text key={e}>{e}</Text>)}
      <Button
        title="go to NewItem"
        onPress={() => navigation.push('NewItem')}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C2A38',
  },
})
