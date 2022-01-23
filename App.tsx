import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from 'modules/home/HomeScreen'
import InboxScreen from 'modules/inbox/InboxScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import { store } from 'app/store'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, title: '' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewItem" component={NewItemScreen} />
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Root"
            component={Root}
            options={{
              title: 'Home',
              headerStyle: { backgroundColor: '#0C2A38' },
              headerTintColor: '#fff',
              headerTitle: '',
            }}
          />
          <Drawer.Screen name="Inbox" component={InboxScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
