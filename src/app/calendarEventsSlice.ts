import { createSlice } from '@reduxjs/toolkit'
import { CalendarEvent } from 'typings'

const initialState: CalendarEvent[] = [
  {
    id: '1231j1nunjn',
    summary: 'Google I/O 2015',
    location: '800 Howard St., San Francisco, CA 94103',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2015-05-28T09:30:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2015-05-28T17:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
    attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  },
  {
    id: 'asjidj8q81ji12i',
    summary: 'Google I/O 2016',
    location: '800 Howard St., San Francisco, CA 94103',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2015-05-28T13:00:00-15:45',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2015-05-28T17:00:00-19:00',
      timeZone: 'America/Los_Angeles',
    },
    recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
    attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  },
]
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addCalendarEvent: (
      state,
      action: { type: string; payload: CalendarEvent },
    ) => (state = [...state, action.payload]),
  },
})
const eventsReducer = eventsSlice.reducer

export const { addCalendarEvent } = eventsSlice.actions

export default eventsReducer
