import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { windowWidth } from 'utils/dimensions'
import { AccessoryID, theme } from 'shared'

const AddTaskView = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        inputAccessoryViewID={AccessoryID.Input}
        placeholder="Add a Task"
      />
    </View>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: theme.bg.primary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  input: {
    fontSize: 20,
    paddingLeft: 10,
  },
})
