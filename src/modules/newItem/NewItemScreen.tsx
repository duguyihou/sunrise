import React, { useLayoutEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { useAppDispatch } from 'app/hooks'
import { addCalendarEvent } from 'app/calendarEventsSlice'
import { CalendarEvent } from 'typings'
import { theme } from 'shared/theme'

type RootStackParamList = {
  Home: undefined
  NewItem: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
const defaultValues = {
  summary: '',
  location: '',
  description: '',
  start: {
    dateTime: '',
    timeZone: '',
  },
  end: {
    dateTime: '',
    timeZone: '',
  },
  recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  attendees: [{ email: '' }],
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
  const dispatch = useAppDispatch()
  const onSubmit = (data: CalendarEvent) => {
    dispatch(addCalendarEvent(data))
    navigation.goBack()
  }

  const handleCancel = () => navigation.goBack()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Event',
      headerStyle: { backgroundColor: '#0C2A38' },
      headerTintColor: '#fff',
      headerLeft: () => (
        <TouchableOpacity onPress={handleCancel}>
          <FontAwesomeIcon icon={faTimes} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <FontAwesomeIcon icon={faCheck} color="#fff" />
        </TouchableOpacity>
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
      {errors.summary && <Text style={styles.error}>This is required.</Text>}
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
    backgroundColor: theme.bg.primary,
  },
  summary: {
    width: windowWidth - 20,
    padding: 10,
    fontSize: 20,
    borderBottomColor: theme.border,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  description: {
    width: windowWidth - 20,
    padding: 10,
    fontSize: 16,
  },
})
