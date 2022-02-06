import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import RootRoute from './RootRoute'

function Routes() {
  return (
    <NavigationContainer>
      <RootRoute />
    </NavigationContainer>
  )
}

export default Routes
