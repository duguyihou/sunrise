import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { theme } from 'shared/theme'

type Props = {
  onPress?: () => void
  size?: number
  icon: IconDefinition
  style?: Record<string, string | number>
  color?: string
}
function IconButton(props: Props) {
  const {
    onPress,
    size = 20,
    icon,
    style = {},
    color = theme.font.primary,
  } = props
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={1}>
      <FontAwesomeIcon icon={icon} color={color} size={size} />
    </TouchableOpacity>
  )
}

export default IconButton
