import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { theme } from 'shared'
type Props = {
  showCompletedTasks: boolean
  setShowCompletedTasks: Dispatch<SetStateAction<boolean>>
}
const CompletedTaskHeader = (props: Props) => {
  const { showCompletedTasks, setShowCompletedTasks } = props
  const toggle = () => setShowCompletedTasks(!showCompletedTasks)
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={toggle}>
        <Text style={styles.text}>Completed</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CompletedTaskHeader

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    padding: 5,
    borderColor: theme.font.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.font.placeholder,
  },
})
