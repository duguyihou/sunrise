import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasklist: {
    title: '',
    updated: '',
    etag: '',
    id: '',
    kind: 'tasks#taskList',
    selfLink: '',
  },
}
const tasklistsSlice = createSlice({
  name: 'tasklists',
  initialState,
  reducers: {
    updateTasklist: (state, { payload }) => ({
      ...state,
      tasklist: payload,
    }),
  },
})

const tasklistsReducer = tasklistsSlice.reducer
export const { updateTasklist } = tasklistsSlice.actions
export default tasklistsReducer
