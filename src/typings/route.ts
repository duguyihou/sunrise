import { CalendarEvent } from 'typings'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: undefined
  Home: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}
