import { CalendarEvent } from 'typings'
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Tasklist } from './task'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: { key: Tasklist }
  Tasklist: undefined
  Home: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
