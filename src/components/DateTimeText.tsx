import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getCalendar, isBeforeToday } from 'utils/dateTime'
import { theme } from 'shared'

type Props = {
  dateTime: string
  showPlaceholder?: boolean
  style?: Record<string, string | number>
}
const DateTimeText = (props: Props) => {
  const { dateTime, showPlaceholder, style } = props
  return (
    <Text
      style={[
        styles.common,
        style,
        !!dateTime && isBeforeToday(dateTime) && styles.before,
      ]}>
      {dateTime ? getCalendar(dateTime) : showPlaceholder && 'Add date/time'}
    </Text>
  )
}

export default DateTimeText

const styles = StyleSheet.create({
  common: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },

  before: {
    color: theme.font.beforeDate,
  },
})
