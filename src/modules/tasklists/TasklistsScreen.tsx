import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList, StackProps } from 'typings'
import { windowHeight, windowWidth } from 'utils/dimensions'
import TasklistItem from 'components/TasklistItem'
import { theme } from 'shared'
import {
  faCalendar,
  faCheckSquare,
  faInbox,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons'

const tasklistsRoutes = [
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
const TasklistsScreen = ({ navigation, route }: StackProps) => {
  return (
    <ScrollView style={styles.container}>
      {tasklistsRoutes.map(({ title, path, icon }) => (
        <TasklistItem
          key={title}
          title={title}
          path={path as keyof RootStackParamList}
          icon={icon}
          navigation={navigation}
          route={route}
        />
      ))}
    </ScrollView>
  )
}

export default TasklistsScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: theme.bg.primary,
  },
})
