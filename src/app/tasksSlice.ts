import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTask: { title: '', due: '', notes: '', status: false },
  showCompletedTasks: false,

  taskDetail: {
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
  subtaskTitle: '',
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
    updateTaskDetail: (state, { payload }) => ({
      ...state,
      taskDetail: payload,
    }),

    updateSubtask: (state, { payload }) => ({
      ...state,
      subtaskTitle: payload,
    }),
    clearSubtask: state => ({
      ...state,
      subtaskTitle: '',
    }),
  },
})

const tasksReducer = tasksSlice.reducer
export const {
  updateNewTask,
  clearNewTask,
  toggleShowCompletedTasks,
  updateTaskDetail,
  updateSubtask,
  clearSubtask,
} = tasksSlice.actions
export default tasksReducer
