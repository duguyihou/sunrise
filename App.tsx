import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from 'modules/home/HomeScreen'
import InboxScreen from 'modules/inbox/InboxScreen'

const Drawer = createDrawerNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Inbox" component={InboxScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
