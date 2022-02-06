import {
  faCalendar,
  faCheckSquare,
  faInbox,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons'

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
