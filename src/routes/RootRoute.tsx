import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import { useAppSelector } from 'app/hooks'
import { Auth } from 'typings/auth'
import HomeScreen from 'modules/home/HomeScreen'
import NewItemScreen from 'modules/newItem/NewItemScreen'
import ItemDetailScreen from 'modules/itemDetail/ItemDetailScreen'
import SigninScreen from 'modules/signin/SigninScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { accessToken } = useAppSelector(state => state.auth) as Auth
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0C2A38' },
        headerTintColor: '#fff',
      }}>
      {accessToken ? (
        <>
          <RootStack.Group>
            <RootStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: '' }}
            />
            <RootStack.Screen name="ItemDetail" component={ItemDetailScreen} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="NewItem" component={NewItemScreen} />
          </RootStack.Group>
        </>
      ) : (
        <RootStack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  )
}

export default RootRoute
