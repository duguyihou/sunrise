import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { currentMonth } from 'utils/dateTime'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-native-snap-carousel'
import { windowWidth } from 'utils/dimensions'

const CalendatBanner = ({ item }) => {
  const renderItem = () => {
    return (
      <View>
        <Text style={styles.carouselText}>{item}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => console.log({ currentMonth: currentMonth() })}>
        <Text style={styles.label}>{currentMonth()}</Text>
        <FontAwesomeIcon icon={faAngleRight} color="#fff" size={20} />
      </TouchableOpacity>
      <Carousel
        data={['1', '2', '3', '4', '5']}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth / 4}
        activeSlideAlignment="start"
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
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

  carouselText: {
    width: windowWidth / 4 - 10,
    padding: 5,
    height: 100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'red',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
