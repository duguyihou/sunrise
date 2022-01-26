import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  getCurrentDayName,
  getCurrentDay,
  getCurrentMonth,
} from 'utils/dateTime'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'

const CalendatBanner = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => console.log({ currentMonth: getCurrentMonth() })}>
        <Text style={styles.label}>{getCurrentMonth()}</Text>
        <FontAwesomeIcon icon={faAngleRight} color="#fff" size={20} />
      </TouchableOpacity>
      <View style={styles.daysContainer}>
        <TouchableOpacity
          style={styles.dayContainer}
          onPress={() => console.log({ getCurrentDay: getCurrentDay() })}>
          <Text style={styles.day}>{getCurrentDay()}</Text>
          <Text style={styles.dayName}>{getCurrentDayName()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CalendatBanner

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  daysContainer: {
    width: windowWidth - 20,
    height: 100,
    padding: 10,
  },
  dayContainer: {
    width: (windowWidth - 20) / 4,
    height: 100,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})
