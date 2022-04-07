import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { theme } from 'shared/theme'

type Options = {
  icon?: IconDefinition
  iconColor?: string
  iconSize?: number
}
type Props = {
  title: string
  onPress: () => void
  options?: Options
}
function OperationItem(props: Props) {
  const { title, onPress, options } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {options?.icon && (
        <FontAwesomeIcon
          icon={options.icon}
          color={options.iconColor}
          size={options.iconSize}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default OperationItem

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: theme.font.secondary,
  },
})
