import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { InputAccessoryView, StyleSheet } from 'react-native'
import { AccessoryID, RouteName } from 'shared'
import { StackNavigationProps } from 'typings'
import IconButton from './IconButton'

const TaskAccessory = () => {
  const navigation = useNavigation<StackNavigationProps>()
  const handleSetDateTime = () => navigation.navigate(RouteName.DateTime)

  return (
    <InputAccessoryView nativeID={AccessoryID.Task}>
      <IconButton
        style={styles.icon}
        icon={faCalendarCheck}
        fn={handleSetDateTime}
      />
    </InputAccessoryView>
  )
}

export default TaskAccessory

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
})
