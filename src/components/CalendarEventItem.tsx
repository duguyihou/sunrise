import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { CalendarEvent } from 'typings'
import { windowWidth } from 'utils/dimensions'
import { dateFormat } from 'utils/dateTime'
import { theme } from 'shared'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'typings'

const CalendarEventItem = (calendarEvent: CalendarEvent) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { summary, notification, description } = calendarEvent
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ItemDetail', { calendarEvent })}>
      <Text style={styles.summary}>{summary}</Text>
      {!!description && (
        <FontAwesomeIcon
          style={styles.description}
          icon={faThumbtack}
          color={theme.font.secondary}
          size={12}
        />
      )}
      <Text style={styles.notification}>
        {notification ? dateFormat(notification) : ''}
      </Text>
    </TouchableOpacity>
  )
}

export default CalendarEventItem

const styles = StyleSheet.create({
  item: {
    width: windowWidth - 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    fontSize: 20,
    color: theme.font.primary,
  },
  description: {
    marginLeft: 5,
  },
  notification: {
    marginLeft: 'auto',
    fontSize: 18,
    color: theme.font.secondary,
  },
})
