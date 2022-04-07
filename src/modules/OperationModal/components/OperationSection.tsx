import { useDeleteTasklistMutation } from 'hooks/tasklists'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from 'shared/theme'

import OperationItem from './OperationItem'

function OperationSection() {
  const deleteTasklistMutation = useDeleteTasklistMutation()
  const operations = [
    {
      title: 'Delete',
      onPress: () => deleteTasklistMutation.mutate(),
    },
  ]
  return (
    <View style={styles.container}>
      {operations.map(({ title, onPress }) => (
        <OperationItem key={title} title={title} onPress={onPress} />
      ))}
    </View>
  )
}

export default OperationSection

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: theme.bg.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
