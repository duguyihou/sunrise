import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'app/hooks'
import TasklistScreen from 'modules/tasklist/TasklistScreen'
import MyTasksScreen from 'modules/myTasks/MyTasksScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import { routeName, tasklistName, theme } from 'shared'
import NewTasklistScreen from 'modules/newTasklist/NewTasklistScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { access_token } = useAppSelector(state => state.auth)

  if (!access_token) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={routeName.SignIn} component={SigninScreen} />
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
          name={routeName.Tasklists}
          component={TasklistsScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={routeName.Tasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={routeName.MyTasks}
          component={MyTasksScreen}
          options={{ title: tasklistName.MyTasks }}
        />
        <RootStack.Screen
          name={routeName.NewTasklist}
          component={NewTasklistScreen}
        />
      </RootStack.Group>
      {/* <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name={routeName.NewItem} component={NewItemScreen} />
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootRoute
