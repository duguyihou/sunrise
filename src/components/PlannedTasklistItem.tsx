import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import { RouteName, TasklistName, theme } from 'shared'
import { StackProps, Tasklist } from 'typings'
import IconButton from './IconButton'

type Props = StackProps & {
  tasklists: Tasklist[]
}
const PlannedTasklistItem = ({ navigation, tasklists }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push(RouteName.Planned, {
          tasklists,
        })
      }>
      <IconButton icon={faCalendar} />
      <Text style={styles.text}>{TasklistName.Planned}</Text>
    </TouchableOpacity>
  )
}

export default PlannedTasklistItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.font.primary,
    padding: 10,
  },
})
