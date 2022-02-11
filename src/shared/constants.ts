import {
  faCalendar,
  faCheckSquare,
  faInbox,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons'

export enum routeNames {
  Root = 'Root',
  SignIn = 'SignIn',
  Tasklists = 'Tasklists',
  Inbox = 'Inbox',
  Home = 'Home',
  All = 'All',
  Completed = 'Completed',
  NewItem = 'NewItem',
  ItemDetail = 'ItemDetail',
}

export const fixedListsRoutes = [
  {
    title: 'Inbox',
    path: 'Inbox',
    icon: faInbox,
  },
  {
    title: 'Planned',
    path: 'Home',
    icon: faCalendar,
  },
  {
    title: 'All',
    path: 'All',
    icon: faInfinity,
  },
  {
    title: 'Completed',
    path: 'Completed',
    icon: faCheckSquare,
  },
]

export enum tasklist {
  inbox = 'My Tasks',
}
