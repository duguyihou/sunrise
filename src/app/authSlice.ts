import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from 'api/auth'
import { Auth, Access, RefreshAccessTokenPayload } from 'typings'

export const fetchRefreshAccessToken = createAsyncThunk(
  'auth/fetchRefreshAccessToken',
  async (payload: RefreshAccessTokenPayload, { rejectWithValue }) => {
    try {
      const response = await authService.refreshAccessToken(payload)
      return response.data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  },
)
const initialState = {
  access: {
    access_token: '',
    expires_in: '',
    scope: '',
    token_type: '',
    id_token: '',
  } as Access,
  auth: {
    accessToken: '',
    accessTokenExpirationDate: '',
    idToken: '',
    scopes: [],
    refreshToken: '',
  } as Auth,
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
        auth: {
          ...state.auth,
          accessToken,
          accessTokenExpirationDate,
          refreshToken,
          idToken,
          scopes,
        },
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRefreshAccessToken.fulfilled, (state, { payload }) => {
      console.log('🐵 fetchRefreshAccessToken', payload)
      return (state = { ...state, access: payload })
    })
  },
})

const authReducer = authSlice.reducer
export const { saveAuth } = authSlice.actions
export default authReducer
