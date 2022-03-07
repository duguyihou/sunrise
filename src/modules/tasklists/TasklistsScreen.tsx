import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { StackProps } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme, TasklistName } from 'shared'
import { useAddTasklistMutation, useFetchTasklistQuery } from 'hooks/tasklists'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import IconButton from 'components/IconButton'
import PlannedTasklistItem from 'components/PlannedTasklistItem'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  const { isLoading, error, data: allTasklists } = useFetchTasklistQuery()
  const addTasklistMutation = useAddTasklistMutation(TasklistName.UntitledList)
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faPlus} fn={handlePlus} />,
    }),
  )
  const handlePlus = () => addTasklistMutation.mutate()

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <ScrollView style={styles.container}>
      {allTasklists && (
        <PlannedTasklistItem
          tasklists={allTasklists}
          navigation={navigation}
          route={route}
        />
      )}
      {allTasklists &&
        allTasklists.map(tasklist => (
          <TasklistItem
            key={tasklist.id}
            tasklist={tasklist}
            navigation={navigation}
            route={route}
          />
        ))}
    </ScrollView>
  )
}

export default TasklistsScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: theme.bg.secondary,
  },
})
