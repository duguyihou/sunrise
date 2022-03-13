import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTask: { title: '', due: '', notes: undefined },
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTitle: (state, { payload }) => {
      return (state = {
        ...state,
        newTask: { ...state.newTask, title: payload },
      })
    },
    updateDateTime: (state, { payload }) => {
      return (state = {
        ...state,
        newTask: { ...state.newTask, due: payload },
      })
    },
    clearTask: () => initialState,
  },
})

const tasksReducer = tasksSlice.reducer
export const { updateTitle, updateDateTime, clearTask } = tasksSlice.actions
export default tasksReducer
