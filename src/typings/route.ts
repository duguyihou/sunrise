import { CalendarEvent } from 'typings'
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: { path: string }
  Inbox: undefined
  Home: undefined
  All: undefined
  Completed: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
