import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from 'typings'
import RootRoute from './RootRoute'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function Routes() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          component={RootRoute}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
