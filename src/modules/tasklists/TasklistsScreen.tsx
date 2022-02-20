import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { StackProps } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme, RouteName, TasklistName } from 'shared'
import { useAddTasklistMutation, useFetchTasklistQuery } from 'hooks/tasklists'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import IconButton from 'components/IconButton'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  const handlePlus = () => {
    addTasklistMutation.mutate()
    if (addTasklistMutation.isSuccess) {
      const { id } = addTasklistMutation.data
      navigation.push(RouteName.NewTasklist, {
        title: TasklistName.UntitledList,
        tasklistId: id,
      })
    }
  }
  const addTasklistMutation = useAddTasklistMutation(TasklistName.UntitledList)
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faPlus} fn={handlePlus} />,
    }),
  )
  const { isLoading, error, data } = useFetchTasklistQuery()
  const allTasklists = data?.items

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <ScrollView style={styles.container}>
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
