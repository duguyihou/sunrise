import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { convertToCalendar, isBeforeToday } from 'utils/dateTime'
import { theme } from 'shared/theme'

type Props = {
  dateTime: string
  showPlaceholder?: boolean
  style?: Record<string, string | number>
}
function DateTimeText(props: Props) {
  const { dateTime, showPlaceholder, style } = props
  return (
    <Text
      style={[
        styles.common,
        style,
        !!dateTime && isBeforeToday(dateTime) && styles.before,
      ]}>
      {dateTime
        ? convertToCalendar(dateTime)
        : showPlaceholder && 'Add date/time'}
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
