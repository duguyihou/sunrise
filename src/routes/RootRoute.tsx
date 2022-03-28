import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'redux/hooks'
import TasklistScreen from 'modules/tasklist/TasklistScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import { RouteName, TaskName } from 'shared/constants'
import { theme } from 'shared/theme'
import TaskDetailScreen from 'modules/taskDetail/TaskDetailScreen'
import PlannedTasksScreen from 'modules/planned/PlannedTasksScreen'
import DateTimeScreen from 'modules/dateTime/DateTimeScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { access_token } = useAppSelector(state => state.auth)

  if (!access_token) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={RouteName.SignIn} component={SigninScreen} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.bg.primary },
        headerTintColor: theme.font.secondary,
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name={RouteName.Tasklists}
          component={TasklistsScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={RouteName.Tasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={RouteName.NewTasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={RouteName.TaskDetail}
          component={TaskDetailScreen}
          options={{ title: TaskName.TaskDetail, headerBackTitle: '' }}
        />
        <RootStack.Screen
          name={RouteName.Planned}
          component={PlannedTasksScreen}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name={RouteName.DateTime}
          component={DateTimeScreen}
          options={{
            headerShown: false,
            presentation: 'containedTransparentModal',
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootRoute
