import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'shared'

type Props = {
  fn: () => void
  size?: number
  icon: IconDefinition
}
const IconButton = ({ fn, size = 20, icon }: Props) => {
  return (
    <TouchableOpacity onPress={fn}>
      <FontAwesomeIcon icon={icon} color={theme.font.primary} size={size} />
    </TouchableOpacity>
  )
}

export default IconButton
