import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'app/hooks'
import TasklistScreen from 'modules/tasklist/TasklistScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import { RouteName, TaskName, theme } from 'shared'
import NewTasklistScreen from 'modules/newTasklist/NewTasklistScreen'
import NewTaskScreen from 'modules/newTask/NewTaskScreen'

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
          component={NewTasklistScreen}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name={RouteName.NewTask}
          component={NewTaskScreen}
          options={{
            headerTitle: TaskName.NewTask,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootRoute
