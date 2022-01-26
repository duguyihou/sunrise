import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { getCurrentMonth, getNextDays } from 'utils/dateTime'
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
      <ScrollView
        style={styles.daysContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {getNextDays(8).map(({ day, dayName }) => (
          <TouchableOpacity
            style={styles.dayContainer}
            onPress={() => console.log({ getCurrentDay: day })}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.dayName}>{dayName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    height: 120,
    padding: 10,
    flexDirection: 'row',
  },
  dayContainer: {
    width: (windowWidth - 40) / 4,
    height: 100,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0C2A38',
    backgroundColor: '#254C67',
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
