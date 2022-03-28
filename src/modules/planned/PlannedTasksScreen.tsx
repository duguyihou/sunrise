import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { RouteName } from 'shared/constants'
import { useFetchTasksQueries } from 'common/hooks/tasks'
import CalendatBanner from './CalendarBanner'
import { RouteType } from 'typings/route'

const PlannedTasksScreen = () => {
  const {
    params: { tasklists },
  } = useRoute<RouteType<RouteName.Planned>>()
  const fetchTasksQueryResults = useFetchTasksQueries(tasklists)
  if (fetchTasksQueryResults.every(q => q.isLoading))
    return <Text>loading...</Text>
  if (fetchTasksQueryResults.every(q => q.error))
    return <Text>`An error has occurred</Text>
  if (fetchTasksQueryResults.every(q => q.data)) {
    console.log('🐵 ', fetchTasksQueryResults.map(q => q.data.items).flat())
  }
  return (
    <View style={styles.container}>
      <CalendatBanner />
    </View>
  )
}

export default PlannedTasksScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
