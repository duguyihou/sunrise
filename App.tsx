import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from 'modules/home/HomeScreen'
import InboxScreen from 'modules/inbox/InboxScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import { store } from 'app/store'

const RootStack = createNativeStackNavigator()
const RootDrawer = createDrawerNavigator()

function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false, title: '' }}>
        <RootStack.Screen name="Home" component={HomeScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="NewItem"
          component={NewItemScreen}
          options={{ title: 'New Event' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootDrawer.Navigator>
          <RootDrawer.Screen
            name="Root"
            component={Root}
            options={{
              title: 'Home',
              headerStyle: { backgroundColor: '#0C2A38' },
              headerTintColor: '#fff',
              headerTitle: '',
            }}
          />
          <RootDrawer.Screen name="Inbox" component={InboxScreen} />
        </RootDrawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
