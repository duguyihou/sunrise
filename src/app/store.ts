import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import calendarEventsReducer from './calendarEventsSlice'
import authReducer from './authSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}
const reducer = persistReducer(
  persistConfig,
  combineReducers({
    calendarEvents: calendarEventsReducer,
    auth: authReducer,
  }),
)

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
