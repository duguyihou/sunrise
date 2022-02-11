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
  Tasklist = 'Tasklist',
  Home = 'Home',
  NewItem = 'NewItem',
  ItemDetail = 'ItemDetail',
}

export const fixedListsRoutes = [
  {
    title: 'Inbox',
    path: routeNames.Tasklist,
    icon: faInbox,
  },
  {
    title: 'Planned',
    path: routeNames.Home,
    icon: faCalendar,
  },
  {
    title: 'All',
    path: routeNames.Tasklist,
    icon: faInfinity,
  },
  {
    title: 'Completed',
    path: routeNames.Tasklist,
    icon: faCheckSquare,
  },
]

export enum tasklist {
  inbox = 'My Tasks',
}
