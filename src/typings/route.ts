import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
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
  TaskDetail: { selfLink: string }
  Planned: { tasklists: Tasklist[] }
  DateTime: { taskPayload: TaskPayload }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
