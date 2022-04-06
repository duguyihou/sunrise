/* eslint-disable no-unused-vars */
export enum RouteName {
  Root = 'Root',
  SignIn = 'SignIn',
  Tasklists = 'Tasklists',
  Tasklist = 'Tasklist',
  MyTasks = 'MyTasks',
  NewTasklist = 'NewTasklist',
  NewTask = 'NewTask',
  TaskDetail = 'TaskDetail',
  Planned = 'Planned',
  Home = 'Home',
  DateTime = 'DateTime',
  Operation = 'Operation',
}

export enum TasklistName {
  MyTasks = 'My Tasks',
  UntitledList = 'Untitled list',
  Planned = 'Planned Tasks',
}

export enum TaskName {
  NewTask = 'New Task',
  TaskDetail = '',
}

export enum QueryKey {
  Tasklists = 'tasklists',
  Tasks = 'tasks',
  TaskDetail = 'taskDetail',
}

export enum AccessoryID {
  Task = 'task',
}

export enum TaskStatus {
  NeedsAction = 'needsAction',
  Completed = 'completed',
}
