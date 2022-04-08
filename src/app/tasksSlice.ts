import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
  showCompletedTasks: false,
  subtaskTitle: '',
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, { payload }) => ({
      ...state,
      task: payload,
    }),
    clearTask: state => ({ ...state, task: initialState.task }),
    toggleShowCompletedTasks: state => ({
      ...state,
      showCompletedTasks: !state.showCompletedTasks,
    }),
  },
})

const tasksReducer = tasksSlice.reducer
export const { toggleShowCompletedTasks, updateTask, clearTask } =
  tasksSlice.actions
export default tasksReducer
