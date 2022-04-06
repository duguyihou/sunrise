import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from 'shared/theme'

import OperationItem from './OperationItem'

function OperationSection() {
  const operations = [
    {
      title: 'Rename',
      onPress: () => console.log('🐵 rename'),
    },
    {
      title: 'Delete',
      onPress: () => console.log('🐵 delete'),
    },
  ]
  return (
    <View style={styles.container}>
      {operations.map(({ title, onPress }) => (
        <OperationItem key={title} title={title} onPress={onPress} />
      ))}
    </View>
  )
}

export default OperationSection

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: theme.bg.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
