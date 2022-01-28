import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CalendarEvent } from 'typings'
import { windowWidth } from 'utils/dimensions'
import { dateFormat } from 'utils/dateTime'
import { theme } from 'shared/theme'

const CalendarEventItem = (calendarEvents: CalendarEvent) => {
  const { summary, notification } = calendarEvents
  return (
    <TouchableOpacity style={styles.item} onPress={() => console.log(summary)}>
      <Text style={styles.summary}>{summary}</Text>
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
    color: theme.font.secondary,
  },
  notification: {
    fontSize: 18,
    color: theme.font.secondary,
  },
})
