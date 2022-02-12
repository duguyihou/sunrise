import React, { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { RootStackParamList, StackProps, TasklistQuery } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme, routeNames } from 'shared'
import tasklistService from 'api/tasklists'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  useLayoutEffect(() => navigation.push(routeNames.Home), [navigation])
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    'tasklists',
    async () => await tasklistService.findAll(),
  )
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
            path={routeNames.Tasklist as keyof RootStackParamList}
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
