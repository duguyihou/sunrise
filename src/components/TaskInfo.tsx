import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { getCalendar } from 'utils/dateTime'

type Props = {
  updated: string
}
const TaskInfo = ({ updated }: Props) => {
  const handleComplete = () => console.log('🐵 complete')
  return (
    <View style={styles.container}>
      <Text style={styles.updateInfo}>Updated {getCalendar(updated)}</Text>
      <IconButton icon={faCheck} fn={handleComplete} />
    </View>
  )
}

export default TaskInfo

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  updateInfo: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
})
