import { StyleSheet, View } from 'react-native'
import React from 'react'
import NewTaskView from 'components/NewTaskView'

const NewTaskScreen = () => {
  return (
    <View style={styles.container}>
      <NewTaskView />
    </View>
  )
}

export default NewTaskScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})
