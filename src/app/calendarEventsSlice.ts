import { createSlice } from '@reduxjs/toolkit'
import { CalendarEvent } from 'typings'

const initialState: CalendarEvent[] = [
  {
    id: '1231j1nunjn',
    summary: 'Google I/O 2015',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2015-05-28T09:30:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2015-05-28T17:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    notification: '',
  },
  {
    id: 'asjidj8q81ji12i',
    summary: 'Google I/O 2016',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2015-05-28T13:00:00-15:45',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2015-05-28T17:00:00-19:00',
      timeZone: 'America/Los_Angeles',
    },
    notification: '',
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
