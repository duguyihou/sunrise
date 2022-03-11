import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: '',
  refresh_token: '',
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuth: (state, { payload }) => {
      const { accessToken, refreshToken } = payload
      return (state = {
        ...state,
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    },
    saveToken: (state, { payload }) => {
      return (state = {
        ...state,
        access_token: payload,
      })
    },
  },
})

const authReducer = authSlice.reducer
export const { saveAuth, saveToken } = authSlice.actions
export default authReducer
