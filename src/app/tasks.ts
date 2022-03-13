import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  newTask: { title: 'X', due: undefined, notes: undefined },
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateNewTask: (state, { payload }) => {
      console.log('🐵 payload', payload)
      return (state = { ...state, payload })
    },
  },
})

const tasksReducer = tasksSlice.reducer
export const { updateNewTask } = tasksSlice.actions
export default tasksReducer
