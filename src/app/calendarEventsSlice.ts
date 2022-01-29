import { createSlice } from '@reduxjs/toolkit'
import { CalendarEvent } from 'typings'

const initialState: CalendarEvent[] = [
  {
    id: '12312',
    summary: 'Google I/O 2015',
    description: "A chance to hear more about Google's developer products.",
    notification: '2015-05-28T09:30:00-07:00',
  },
  {
    id: '12321',
    summary: 'Google I/O 2016',
    description: "A chance to hear more about Google's developer products.",
    notification: '2015-05-28T13:00:00-15:45',
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
    updateCalendatEvent: (
      state,
      action: { type: string; payload: CalendarEvent },
    ) => {
      const { id } = action.payload
      const idx = state.findIndex(item => item.id === id)
      state.splice(idx, 1, action.payload)
    },
  },
})
const eventsReducer = eventsSlice.reducer

export const { addCalendarEvent, updateCalendatEvent } = eventsSlice.actions

export default eventsReducer
