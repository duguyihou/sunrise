import { createSlice } from '@reduxjs/toolkit'
import { Auth } from 'typings/auth'

const initialState = {
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
} as Auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuth: (state, { payload }) => {
      const { accessToken, accessTokenExpirationDate, refreshToken } = payload
      return (state = {
        ...state,
        accessToken,
        accessTokenExpirationDate,
        refreshToken,
      })
    },
  },
})

const authReducer = authSlice.reducer

export const { saveAuth } = authSlice.actions

export default authReducer
