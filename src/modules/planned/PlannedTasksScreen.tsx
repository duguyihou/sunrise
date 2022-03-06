import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useFetchTasksQueries } from 'hooks/tasks'
import CalendatBanner from 'components/CalendarBanner'

const PlannedTasksScreen = () => {
  const {
    params: { tasklists },
  } = useRoute<RouteProp<RootStackParamList, RouteName.Planned>>()
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
