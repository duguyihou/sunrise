import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTask: { title: '', due: '', notes: '' },
  showCompletedTasks: false,
  task: {
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
  },
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateNewTask: (state, { payload }) => ({
      ...state,
      newTask: payload,
    }),
    clearNewTask: state => ({ ...state, newTask: initialState.newTask }),
    toggleShowCompletedTasks: state => ({
      ...state,
      showCompletedTasks: !state.showCompletedTasks,
    }),
    updateTask: (state, { payload }) => ({ ...state, task: payload }),
  },
})

const tasksReducer = tasksSlice.reducer
export const {
  updateNewTask,
  clearNewTask,
  toggleShowCompletedTasks,
  updateTask,
} = tasksSlice.actions
export default tasksReducer
