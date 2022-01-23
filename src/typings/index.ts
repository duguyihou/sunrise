interface Start {
  dateTime: string
  timeZone: string
}
interface End {
  dateTime: string
  timeZone: string
}

interface Attendee {
  email: string
}

interface Override {
  method: string
  minutes: number
}
interface Reminders {
  useDefault: boolean
  overrides: Override[]
}

export interface CalendarEvent {
  id: string
  summary: string
  location: string
  description: string
  start: Start
  end: End
  recurrence: string[]
  attendees: Attendee[]
  reminders: Reminders
}
