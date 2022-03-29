import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => useAppSelector(state => state.auth)
export const useTasklists = () => useAppSelector(state => state.tasklists)
export const useTasks = () => useAppSelector(state => state.tasks)
