import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from 'modules/home/HomeScreen'
import InboxScreen from 'modules/inbox/InboxScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewItem" component={NewItemScreen} />
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Root" component={Root} />
        <Drawer.Screen name="Inbox" component={InboxScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
