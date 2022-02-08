import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from 'api/auth'

export const fetchRefreshAccessToken = createAsyncThunk(
  'auth/fetchRefreshAccessToken',
  async (refresh_token: string, { rejectWithValue }) => {
    try {
      const response = await authService.refreshAccessToken(refresh_token)
      return response
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  },
)
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
  },
  extraReducers: builder => {
    builder.addCase(fetchRefreshAccessToken.fulfilled, (state, { payload }) => {
      console.log('🐵 fetchRefreshAccessToken', payload)
      return (state = { ...state, access_token: payload.access_token })
    })
  },
})

const authReducer = authSlice.reducer
export const { saveAuth } = authSlice.actions
export default authReducer
