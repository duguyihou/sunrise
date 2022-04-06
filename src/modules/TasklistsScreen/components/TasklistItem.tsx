import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackNavigationProps } from 'typings/route'
import { Tasklist } from 'typings/task'
import { IconButton } from 'modules/common/components'
import { useAppDispatch } from 'hooks/app'
import { updateTasklist } from 'app/tasklistSlice'

type Props = {
  tasklist: Tasklist
}
function TasklistItem({ tasklist }: Props) {
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const handleSelect = () => {
    dispatch(updateTasklist(tasklist))
    navigation.push(RouteName.Tasklist, { tasklist })
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
