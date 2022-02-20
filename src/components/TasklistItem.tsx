import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

import { RouteName, theme } from 'shared'
import { StackProps, Tasklist } from 'typings'
import IconButton from './IconButton'

type ItemProps = StackProps & {
  tasklist: Tasklist
}
const TasklistItem = ({ navigation, tasklist }: ItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push(RouteName.Tasklist, {
          key: tasklist,
        })
      }>
      <IconButton icon={faListUl} />
      <Text style={styles.text}>{tasklist.title}</Text>
    </TouchableOpacity>
  )
}

export default TasklistItem

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
