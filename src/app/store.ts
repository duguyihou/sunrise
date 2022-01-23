import { configureStore } from '@reduxjs/toolkit'
import calendarEventsReducer from './calendarEventsSlice'

export const store = configureStore({
  reducer: {
    calendarEvents: calendarEventsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
