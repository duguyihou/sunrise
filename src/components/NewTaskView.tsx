import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from 'utils/dimensions'

const NewTaskView = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Add a Task" autoFocus />
    </View>
  )
}

export default NewTaskView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 2,
  },
})
