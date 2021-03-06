import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from 'modules/common/components'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RouteName, TasklistName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackProps } from 'typings/route'
import { Tasklist } from 'typings/task'

type Props = StackProps & {
  tasklists: Tasklist[]
}
function PlannedTasklistItem({ navigation, tasklists }: Props) {
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
    borderBottomColor: theme.border.primary,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.font.primary,
    padding: 10,
  },
})
