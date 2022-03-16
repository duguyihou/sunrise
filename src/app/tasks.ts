import { createSlice } from '@reduxjs/toolkit'
import { Task } from 'typings'

const initialState = {
  newTask: { title: '', due: '', notes: '' },
  showCompletedTasks: false,
  task: {} as Task,
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
    toggleShowCompletedTasks: state => {
      return (state = {
        ...state,
        showCompletedTasks: !state.showCompletedTasks,
      })
    },
    updateTask: (state, { payload }) => {
      return (state = {
        ...state,
        task: payload,
      })
    },
  },
})

const tasksReducer = tasksSlice.reducer
export const {
  updateTitle,
  updateDateTime,
  clearTask,
  toggleShowCompletedTasks,
  updateTask,
} = tasksSlice.actions
export default tasksReducer
