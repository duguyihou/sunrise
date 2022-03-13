import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  newTask: { title: '', due: undefined, notes: undefined },
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
    clearTask: () => initialState,
  },
})

const tasksReducer = tasksSlice.reducer
export const { updateTitle, clearTask } = tasksSlice.actions
export default tasksReducer
