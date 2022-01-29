import { CalendarEvent } from 'typings'

export type RootStackParamList = {
  Root: undefined
  Home: undefined
  NewItem: undefined
  ItemDetail: { calendarEvent: CalendarEvent }
}
