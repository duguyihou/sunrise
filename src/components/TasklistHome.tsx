import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { routeNames, theme } from 'shared'
import { RootStackParamList, StackProps } from 'typings'

type ItemProps = StackProps & {
  path: keyof RootStackParamList
  icon: IconDefinition
}
const TasklistHome = ({ navigation, path, icon }: ItemProps) => {
  return (
    <TouchableOpacity onPress={() => navigation.push(path)}>
      <View style={styles.container}>
        <FontAwesomeIcon icon={icon} size={20} color={theme.font.primary} />
        <Text style={styles.text}>{routeNames.Home}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TasklistHome

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.font.primary,
    padding: 10,
  },
})
