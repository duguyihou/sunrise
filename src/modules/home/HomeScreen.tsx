import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from 'app/hooks'
import CalendarEventItem from 'components/CalendarEventItem'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>
const HomeScreen = ({ navigation }: Props) => {
  const calendarEvents = useAppSelector(state => state.calendarEvents)
  return (
    <View style={styles.container}>
      {calendarEvents &&
        calendarEvents.map(calendarEvent => (
          <CalendarEventItem key={calendarEvent.id} {...calendarEvent} />
        ))}
      <Button title="Add" onPress={() => navigation.push('NewItem')} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0C2A38',
  },
})
