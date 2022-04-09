import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  due: '',
  notes: '',
  updated: '',
  status: false,
  etag: '',
  id: '',
  kind: 'tasks#task',
  position: '',
  selfLink: '',
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, { payload }) => ({ ...state, ...payload }),
    clearTask: () => initialState,
  },
})

const tasksReducer = tasksSlice.reducer
export const { updateTask, clearTask } = tasksSlice.actions
export default tasksReducer
