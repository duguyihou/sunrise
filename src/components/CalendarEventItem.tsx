import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CalendarEvent } from 'typings'
import { windowWidth } from 'utils/dimensions'

const CalendarEventItem = (calendarEvents: CalendarEvent) => {
  const {
    summary,
    start: { dateTime },
  } = calendarEvents
  return (
    <TouchableOpacity style={styles.item} onPress={() => alert('item')}>
      <Text style={styles.summary}>{summary}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>
    </TouchableOpacity>
  )
}

export default CalendarEventItem

const styles = StyleSheet.create({
  item: {
    width: windowWidth - 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    fontSize: 20,
    color: '#DDECF5',
  },
  dateTime: {
    fontSize: 20,
    color: '#758295',
  },
})
