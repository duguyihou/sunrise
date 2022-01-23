import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
type State = string[]
const addEvent: CaseReducer<State, PayloadAction<string>> = (state, action) => [
  ...state,
  action.payload,
]

const initialState = ['a', 'b']
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent,
  },
})

const eventsReducer = eventsSlice.reducer

export default eventsReducer
