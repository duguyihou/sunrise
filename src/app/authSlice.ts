/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuth: (state, { payload }) => {
      const { accessToken, refreshToken } = payload
      return (state = { ...state, accessToken, refreshToken })
    },
    saveToken: (state, { payload }) =>
      (state = { ...state, accessToken: payload }),
  },
})

const authReducer = authSlice.reducer
export const { saveAuth, saveToken } = authSlice.actions
export default authReducer
