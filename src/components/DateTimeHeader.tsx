import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const DateTimeHeader = () => {
  const handleSetDateAndTime = () => console.log('🐵 handleSetDateAndTime')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date and time</Text>
      <TouchableOpacity style={styles.done} onPress={handleSetDateAndTime}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DateTimeHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  done: {
    padding: 10,
    right: 0,
    zIndex: 10,
    position: 'absolute',
  },
})
