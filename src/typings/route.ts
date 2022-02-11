import { CalendarEvent } from 'typings'
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: { key: string }
  Tasklist: undefined
  Home: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
