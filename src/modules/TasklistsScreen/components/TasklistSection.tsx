import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useFetchTasklistQuery } from 'hooks/tasklists'
import { theme } from 'shared/theme'
import TasklistItem from './TasklistItem'

function TasklistSection() {
  const { isLoading, error, data: allTasklists } = useFetchTasklistQuery()

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>

  return (
    <ScrollView style={styles.container}>
      {allTasklists &&
        allTasklists.map(tasklist => (
          <TasklistItem key={tasklist.id} tasklist={tasklist} />
        ))}
    </ScrollView>
  )
}

export default TasklistSection

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.secondary,
  },
})
