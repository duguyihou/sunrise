import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { StackProps } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme, routeNames } from 'shared'
import { useFetchTasklistQuery } from 'hooks/tasklists'
import PlusButton from 'components/PlusButton'

const TasklistsScreen = ({ navigation, route }: StackProps) => {
  useLayoutEffect(() => navigation.push(routeNames.MyTasks), [navigation])
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <PlusButton fn={() => console.log('🐵plus')} />,
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
