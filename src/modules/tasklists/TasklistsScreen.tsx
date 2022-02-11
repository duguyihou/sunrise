import React, { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

import { RootStackParamList, StackProps, TasklistQuery } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme, fixedListsRoutes, routeNames, tasklist } from 'shared'
import tasklistService from 'api/tasklists'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  useLayoutEffect(() => navigation.navigate(routeNames.Home))
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    'tasklists',
    async () => await tasklistService.findAll(),
  )
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  const allLists = data?.items
  const inboxLists = data?.items.filter(({ title }) => title === tasklist.inbox)
  const tasklists = data?.items.filter(({ title }) => title !== tasklist.inbox)
  const tasklistsRoutes = tasklists?.map(({ title }) => ({
    title,
    path: title,
    icon: faListUl,
  }))
  return (
    <ScrollView style={styles.container}>
      {fixedListsRoutes.map(({ title, path, icon }) => (
        <TasklistItem
          key={title}
          title={title}
          path={path as keyof RootStackParamList}
          icon={icon}
          navigation={navigation}
          route={route}
        />
      ))}
      {tasklistsRoutes &&
        tasklistsRoutes.map(({ title, path, icon }) => (
          <TasklistItem
            key={title}
            title={title}
            path={path as keyof RootStackParamList}
            icon={icon}
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
