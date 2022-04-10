import { RouteProp } from '@react-navigation/native'
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { Tasklist, TaskPayload } from './task'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: undefined
  Tasklist: { tasklist: Tasklist }
  Home: undefined
  MyTasks: undefined
  NewTasklist: { tasklist: Tasklist }
  NewTask: { tasklistId: string; taskPayload: TaskPayload }
  TaskDetail: { taskId: string; tasklistId: string }
  Planned: { tasklists: Tasklist[] }
  DateTime: { dateTime: string }
  Operation: { tasklistId: string }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>

export type RouteType<K extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  K
>
