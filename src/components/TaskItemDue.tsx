import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getCalendar, isBeforeToday } from 'utils/dateTime'
import { theme } from 'shared'

type Props = { due: Date }
const TaskItemDue = ({ due }: Props) => {
  return (
    <Text style={[styles.time, isBeforeToday(due) && styles.before]}>
      {getCalendar(due)}
    </Text>
  )
}

export default TaskItemDue

const styles = StyleSheet.create({
  time: {
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
