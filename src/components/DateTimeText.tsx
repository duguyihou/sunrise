import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getCalendar, isBeforeToday } from 'utils/dateTime'
import { theme } from 'shared'

type Props = { dateTime: string }
const DateTimeText = ({ dateTime }: Props) => {
  return (
    <Text style={[styles.common, isBeforeToday(dateTime) && styles.before]}>
      {getCalendar(dateTime)}
    </Text>
  )
}

export default DateTimeText

const styles = StyleSheet.create({
  common: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.border.secondary,
    fontSize: 12,
  },

  before: {
    color: theme.font.beforeDate,
  },
})
