import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faListUl, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { routeNames, theme } from 'shared'
import { RootStackParamList, StackProps, Tasklist } from 'typings'

type ItemProps = StackProps & {
  tasklist: Tasklist
  path: keyof RootStackParamList
}
const TasklistItem = ({ navigation, tasklist, path }: ItemProps) => {
  const isMyTasks = tasklist.title === routeNames.MyTasks
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push(isMyTasks ? routeNames.Home : path, { key: tasklist })
      }>
      <View style={styles.container}>
        <FontAwesomeIcon
          icon={isMyTasks ? faCalendar : faListUl}
          size={20}
          color={theme.font.primary}
        />
        <Text style={styles.text}>{tasklist.title}</Text>
      </View>
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
