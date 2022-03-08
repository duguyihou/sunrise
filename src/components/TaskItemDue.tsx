import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { getCalendar } from 'utils/dateTime'

type Props = { due: Date }
const TaskItemDue = ({ due }: Props) => {
  return <Text style={styles.due}>{getCalendar(due)}</Text>
}

export default TaskItemDue

const styles = StyleSheet.create({
  due: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
  },
})
