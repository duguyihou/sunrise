import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { useAppSelector } from 'app/hooks'
import CalendarEventItem from 'components/CalendarEventItem'
import CalendatBanner from 'components/CalendatBanner'
import { theme } from 'shared'
import { RootStackParamList, Tasklist } from 'typings'
import tasklistService from 'api/tasklists'

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const calendarEvents = useAppSelector(state => state.calendarEvents)
  const { isLoading, error, data } = useQuery<Tasklist, Error>(
    'tasklists',
    async () => await tasklistService.findAll(),
  )
  console.log('🐵 data', data)

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
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
