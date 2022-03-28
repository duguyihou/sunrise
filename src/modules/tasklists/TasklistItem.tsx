import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackProps, Tasklist } from 'typings'
import { IconButton } from 'modules/common/components'
import { useAppDispatch } from 'common/app/hooks'
import { updateTasklistId } from 'common/app/tasks'

type ItemProps = StackProps & {
  tasklist: Tasklist
}
const TasklistItem = ({ navigation, tasklist }: ItemProps) => {
  const dispatch = useAppDispatch()
  const handleSelect = () => {
    const { id } = tasklist
    dispatch(updateTasklistId(id))
    navigation.push(RouteName.Tasklist, {
      tasklist,
    })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleSelect}>
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
    borderBottomColor: theme.border.primary,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.font.primary,
    padding: 10,
  },
})
