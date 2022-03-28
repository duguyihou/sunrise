import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'shared/theme'

type Props = {
  fn?: () => void
  size?: number
  icon: IconDefinition
  style?: Record<string, string | number>
}
const IconButton = ({ fn, size = 20, icon, style = {} }: Props) => {
  return (
    <TouchableOpacity style={style} onPress={fn} activeOpacity={1}>
      <FontAwesomeIcon icon={icon} color={theme.font.primary} size={size} />
    </TouchableOpacity>
  )
}

export default IconButton
