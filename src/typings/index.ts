interface Start {
  dateTime: string
  timeZone: string
}
interface End {
  dateTime: string
  timeZone: string
}
export interface CalendarEvent {
  id: string
  summary: string
  description: string
  start: Start
  end: End
  notification: string
}
