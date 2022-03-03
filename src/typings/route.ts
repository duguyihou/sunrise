import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Tasklist } from './task'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: undefined
  Tasklist: { tasklist: Tasklist }
  Home: undefined
  MyTasks: undefined
  NewTasklist: { title: string; tasklistId: string }
  NewTask: { tasklistId: string; text?: string }
  TaskDetail: { selfLink: string }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
