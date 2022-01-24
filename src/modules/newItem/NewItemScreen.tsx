import React, { useLayoutEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { windowWidth } from 'utils/dimensions'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
const defaultValues = {
  summary: '',
  location: '800 Howard St., San Francisco, CA 94103',
  description: '',
  start: {
    dateTime: '2015-05-28T09:30:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2015-05-28T17:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  attendees: [{ email: 'lpage@example.com' }],
  reminders: {
    useDefault: true,
  },
}
const NewItemScreen = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  const onSubmit = data => alert(data.summary)
  const handleCancel = () => navigation.goBack()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Event',
      headerLeft: () => (
        <Button onPress={handleCancel} title="Cancel" color="#000" />
      ),
      headerRight: () => (
        <Button onPress={handleSubmit(onSubmit)} title="Save" color="#000" />
      ),
    })
  })
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="summary"
            style={styles.summary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="summary"
      />
      {errors.summary && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="description"
            style={styles.description}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
    </View>
  )
}

export default NewItemScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  summary: {
    width: windowWidth - 20,
    padding: 10,
    fontSize: 20,
  },
  description: {
    width: windowWidth - 20,
    padding: 10,
    fontSize: 16,
  },
})
