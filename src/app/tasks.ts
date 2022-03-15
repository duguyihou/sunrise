import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTask: { title: '', due: '', notes: '' },
  showCompletedTasks: false,
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
  },
})

const tasksReducer = tasksSlice.reducer
export const {
  updateTitle,
  updateDateTime,
  clearTask,
  toggleShowCompletedTasks,
} = tasksSlice.actions
export default tasksReducer
