import React from 'react'
import { Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from 'shared'
import { windowWidth } from 'utils/dimensions'

type Props = {
  visible: boolean
  children: React.ReactNode
  setVisible: (modalVisible: boolean) => void
}
const DialogView = ({ visible, children, setVisible }: Props) => {
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

export default DialogView

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.bg.secondary,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    padding: 15,
    borderRadius: 10,
    width: windowWidth / 2,
  },
})
