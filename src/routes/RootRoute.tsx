import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList, Access } from 'typings'
import { useAppSelector } from 'app/hooks'
import InboxScreen from 'modules/inbox/InboxScreen'
import HomeScreen from 'modules/home/HomeScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import ItemDetailScreen from 'modules/itemDetail/ItemDetailScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import AllTasksScreen from 'modules/all/AllTasksScreen'
import CompletedTasksScreen from 'modules/completed/CompletedTasksScreen'
import { theme } from 'shared'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { access_token } = useAppSelector(state => state.auth.access) as Access

  if (!access_token) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SignIn" component={SigninScreen} />
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
          name="Tasklists"
          component={TasklistsScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen name="Inbox" component={InboxScreen} />
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="All" component={AllTasksScreen} />
        <RootStack.Screen name="Completed" component={CompletedTasksScreen} />
        <RootStack.Screen name="ItemDetail" component={ItemDetailScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="NewItem" component={NewItemScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootRoute
