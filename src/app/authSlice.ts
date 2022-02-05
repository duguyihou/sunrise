import { createSlice } from '@reduxjs/toolkit'
import { Auth } from 'typings'

const initialState: Auth = {
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
}
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
