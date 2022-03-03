import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Root: undefined
  SignIn: undefined
  Tasklists: undefined
  Tasklist: { title: string; tasklistId: string; selfLink: string }
  Home: undefined
  MyTasks: undefined
  NewTasklist: { title: string; tasklistId: string }
  NewTask: { tasklistId: string; text?: string }
  TaskDetail: { selfLink: string }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>
