import { createSlice } from '@reduxjs/toolkit'
import { Auth } from 'typings'

const initialState: Auth = {
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
  idToken: '',
  scopes: [],
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuth: (state, { payload }) => {
      const {
        accessToken,
        accessTokenExpirationDate,
        refreshToken,
        idToken,
        scopes,
      } = payload
      return (state = {
        ...state,
        accessToken,
        accessTokenExpirationDate,
        refreshToken,
        idToken,
        scopes,
      })
    },
  },
})

const authReducer = authSlice.reducer

export const { saveAuth } = authSlice.actions

export default authReducer
