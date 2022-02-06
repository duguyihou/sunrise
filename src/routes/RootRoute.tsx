import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'app/hooks'
import { Auth } from 'typings/auth'
import InboxScreen from 'modules/inbox/InboxScreen'
import HomeScreen from 'modules/home/HomeScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import ItemDetailScreen from 'modules/itemDetail/ItemDetailScreen'
import SigninScreen from 'modules/signin/SigninScreen'
import TasklistsScreen from 'modules/tasklists/TasklistsScreen'
import AllTasksScreen from 'modules/all/AllTasksScreen'
import CompletedTasksScreen from 'modules/completed/CompletedTasksScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { accessToken } = useAppSelector(state => state.auth) as Auth

  if (!accessToken) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SignIn" component={SigninScreen} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0C2A38' },
        headerTintColor: '#fff',
      }}>
      <RootStack.Group>
        <RootStack.Screen name="Tasklists" component={TasklistsScreen} />
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
