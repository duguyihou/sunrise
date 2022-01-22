import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from 'modules/home/HomeScreen'
import InboxScreen from 'modules/inbox/InboxScreen'

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
