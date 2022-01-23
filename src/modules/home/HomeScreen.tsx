import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
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
      <TouchableOpacity
        style={styles.plus}
        onPress={() => navigation.push('NewItem')}>
        <Text>Add</Text>
      </TouchableOpacity>
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
  plus: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
})
