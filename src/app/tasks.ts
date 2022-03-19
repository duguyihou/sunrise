import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTask: { title: '', due: '', notes: '' },
  showCompletedTasks: false,
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateNewTask: (state, { payload }) => {
      return {
        ...state,
        newTask: payload,
      }
    },
    clearNewTask: state => ({ ...state, newTask: initialState.newTask }),
    toggleShowCompletedTasks: state => {
      return (state = {
        ...state,
        showCompletedTasks: !state.showCompletedTasks,
      })
    },
  },
})

const tasksReducer = tasksSlice.reducer
export const { updateNewTask, clearNewTask, toggleShowCompletedTasks } =
  tasksSlice.actions
export default tasksReducer
