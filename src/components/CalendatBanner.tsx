import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { currentMonth } from 'utils/dateTime'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'

const CalendatBanner = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => console.log({ currentMonth: currentMonth() })}>
        <Text style={styles.label}>{currentMonth()}</Text>
        <FontAwesomeIcon icon={faAngleRight} color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default CalendatBanner

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 200,
  },
  labelContainer: {
    width: windowWidth - 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
})
