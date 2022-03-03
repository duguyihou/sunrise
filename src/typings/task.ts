export interface Task {
  etag: string
  id: string
  kind: string
  position: string
  selfLink: string
  status: string
  title: string
  updated: string
  due?: Date
  notes?: string
}

export interface Tasklist {
  kind: string
  id: string
  etag: string
  title: string
  updated: string
  selfLink: string
}

export interface TasklistQuery {
  etag: string
  items: Tasklist[]
  kind: string
}

export interface TaskQuery {
  etag: string
  items: Task[]
  kind: string
}

export type TaskDetailQuery = Task

export interface TaskPayload {
  title: string
  notes: string
  due: Date
}
