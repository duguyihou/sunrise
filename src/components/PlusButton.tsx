import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'shared'

type Props = {
  fn: () => void
}
const PlusButton = ({ fn }: Props) => {
  return (
    <TouchableOpacity onPress={fn}>
      <FontAwesomeIcon icon={faPlus} color={theme.font.primary} />
    </TouchableOpacity>
  )
}

export default PlusButton
