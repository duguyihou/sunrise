import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'shared'

type Props = {
  fn: () => void
}
const EllipsishButton = ({ fn }: Props) => {
  return (
    <TouchableOpacity onPress={fn}>
      <FontAwesomeIcon icon={faEllipsisH} color={theme.font.primary} />
    </TouchableOpacity>
  )
}

export default EllipsishButton
