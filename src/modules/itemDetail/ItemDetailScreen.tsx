import React, { useLayoutEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCheck,
  faStickyNote,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { useAppDispatch } from 'app/hooks'
import { updateCalendatEvent } from 'app/calendarEventsSlice'
import { CalendarEvent, RootStackParamList } from 'typings'
import { theme } from 'shared'
const NewItemScreen = () => {
  const navigation = useNavigation()
  const {
    params: { calendarEvent },
  } = useRoute<RouteProp<RootStackParamList, 'ItemDetail'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: calendarEvent })
  const dispatch = useAppDispatch()
  const onSubmit = (data: CalendarEvent) => {
    dispatch(updateCalendatEvent(data))
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <FontAwesomeIcon icon={faCheck} color={theme.font.primary} />
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
            placeholder="Type what you want"
            placeholderTextColor={theme.font.placeholder}
            style={styles.summary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="summary"
      />
      {errors.summary && <Text style={styles.error}>This is required.</Text>}
      <View style={styles.section}>
        <FontAwesomeIcon icon={faBell} color={theme.font.secondary} />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="No Notification"
              placeholderTextColor={theme.font.placeholder}
              style={styles.detail}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
            />
          )}
          name="notification"
        />
      </View>
      <View style={styles.section}>
        <FontAwesomeIcon icon={faStickyNote} color={theme.font.secondary} />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.detail}
              placeholder="description"
              placeholderTextColor={theme.font.placeholder}
              multiline={true}
              numberOfLines={6}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
      </View>
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
    fontWeight: 'bold',
    color: theme.font.primary,
    borderBottomColor: theme.border,
    borderBottomWidth: 2,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  section: {
    width: windowWidth - 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  detail: {
    padding: 10,
    fontSize: 16,
    color: theme.font.primary,
  },
})
