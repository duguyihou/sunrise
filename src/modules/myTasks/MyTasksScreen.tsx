import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CalendatBanner from 'components/CalendatBanner'
import { routeNames, theme } from 'shared'
import { StackProps } from 'typings'

const MyTasksScreen = ({ navigation }: StackProps) => {
  return (
    <View style={styles.container}>
      <CalendatBanner />

      <TouchableOpacity
        style={styles.plus}
        onPress={() => navigation.push(routeNames.NewItem)}>
        <FontAwesomeIcon icon={faPlus} color={theme.font.primary} size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default MyTasksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.bg.primary,
  },
  plus: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
})
