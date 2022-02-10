import React from 'react'
import { useQuery } from 'react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { RootStackParamList, StackProps, TasklistQuery } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme } from 'shared'
import { fixedListsRoutes } from 'shared/constants'
import tasklistService from 'api/tasklists'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    'tasklists',
    async () => await tasklistService.findAll(),
  )
  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  const tasklistsRoutes = data?.items.map(({ title }) => ({
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
