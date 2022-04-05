import React from 'react'
import { Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from 'shared/theme'
import { windowWidth } from 'utils/dimensions'

type Props = {
  visible: boolean
  children: React.ReactNode
  setVisible: (modalVisible: boolean) => void
}
function PopupView({ visible, children, setVisible }: Props) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setVisible(!visible)}>
        <TouchableOpacity style={styles.container}>{children}</TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default PopupView

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.bg.secondary,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop: 88,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    width: windowWidth / 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
})
