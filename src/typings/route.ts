import { CalendarEvent } from 'typings'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Home: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}
