import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { getCurrentMonth, getNextDays } from 'utils/dateTime'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { theme } from 'shared/theme'
import { IconButton } from 'modules/common/components'

const Next_DAYS = 8
const CalendatBanner = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => console.log({ currentMonth: getCurrentMonth() })}>
        <Text style={styles.label}>{getCurrentMonth()}</Text>
        <IconButton icon={faAngleRight} />
      </TouchableOpacity>
      <ScrollView
        style={styles.daysContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {getNextDays(Next_DAYS).map(({ day, dayName }) => (
          <TouchableOpacity
            key={day}
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
    width: '100%',
    height: 80,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.font.primary,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dayContainer: {
    width: (windowWidth - 20) / 4,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.bg.primary,
    backgroundColor: theme.bg.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.font.primary,
  },
  dayName: {
    fontSize: 12,
    color: theme.font.primary,
  },
})
