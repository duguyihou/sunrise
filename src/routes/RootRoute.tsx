import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'app/hooks'
import TasklistScreen from 'modules/tasklist/TasklistScreen'
import MyTasksScreen from 'modules/myTasks/MyTasksScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import ItemDetailScreen from 'modules/itemDetail/ItemDetailScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import { routeNames, tasklistName, theme } from 'shared'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { access_token } = useAppSelector(state => state.auth)

  if (!access_token) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={routeNames.SignIn} component={SigninScreen} />
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
          name={routeNames.Tasklists}
          component={TasklistsScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={routeNames.Tasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={routeNames.MyTasks}
          component={MyTasksScreen}
          options={{ title: tasklistName.MyTasks }}
        />
        <RootStack.Screen
          name={routeNames.ItemDetail}
          component={ItemDetailScreen}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name={routeNames.NewItem} component={NewItemScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootRoute
