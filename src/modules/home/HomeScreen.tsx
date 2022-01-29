import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from 'app/hooks'
import CalendarEventItem from 'components/CalendarEventItem'
import CalendatBanner from 'components/CalendatBanner'
import { theme } from 'shared/theme'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>
const HomeScreen = ({ navigation }: Props) => {
  const calendarEvents = useAppSelector(state => state.calendarEvents)
  return (
    <View style={styles.container}>
      <CalendatBanner />
      {calendarEvents &&
        calendarEvents.map(calendarEvent => (
          <CalendarEventItem key={calendarEvent.id} {...calendarEvent} />
        ))}
      <TouchableOpacity
        style={styles.plus}
        onPress={() => navigation.push('NewItem')}>
        <FontAwesomeIcon icon={faPlus} color={theme.font.primary} size={30} />
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
    backgroundColor: theme.bg.primary,
  },
  plus: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
})
