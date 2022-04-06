import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { theme } from 'shared/theme'

type Props = {
  title: string
  fn: () => void
}
function PopupItem({ title, fn }: Props) {
  return (
    <TouchableOpacity onPress={fn}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PopupItem

const styles = StyleSheet.create({
  title: {
    color: theme.font.primary,
  },
})
