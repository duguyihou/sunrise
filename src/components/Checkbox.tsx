import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

type Props = {
  size?: number
  fillColor?: string
  unfillColor?: string
  text?: string
  iconStyle?: Record<string, unknown>
  textStyle?: Record<string, unknown>
  onPress: (isChecked: boolean) => void
  isChecked: boolean
}
const Checkbox = ({
  size,
  fillColor,
  unfillColor,
  text,
  iconStyle,
  textStyle,
  onPress,
  isChecked,
}: Props) => {
  return (
    <BouncyCheckbox
      size={size}
      fillColor={fillColor}
      unfillColor={unfillColor}
      text={text}
      iconStyle={iconStyle}
      textStyle={textStyle}
      onPress={() => onPress(isChecked)}
    />
  )
}

export default Checkbox
