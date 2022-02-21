import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { ControllerRenderProps } from 'react-hook-form'

import { theme } from 'shared'
import { windowWidth } from 'utils/dimensions'
import { getDue } from 'utils/dateTime'

const DateTimeView = (controllerRenderProps: ControllerRenderProps) => {
  const { value, onChange } = controllerRenderProps

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.dateTime}
        placeholder="Date/Time"
        value={getDue(value)}
        onChange={onChange}
      />
    </View>
  )
}

export default DateTimeView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 18,
    color: theme.font.primary,
    paddingHorizontal: 10,
    width: '50%',
  },
})
