import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PersistGate } from 'redux-persist/integration/react'

import HomeScreen from 'modules/home/HomeScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import ItemDetailScreen from 'modules/itemDetail/ItemDetailScreen'

import { store, persistor } from 'app/store'
import { RootStackParamList } from 'typings/route'
import SigninScreen from 'modules/signin/SigninScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function Root() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0C2A38' },
        headerTintColor: '#fff',
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="ItemDetail" component={ItemDetailScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="NewItem" component={NewItemScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Root"
              component={Root}
              options={{ headerShown: false }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
