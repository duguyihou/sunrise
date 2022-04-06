import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import RootRoute from './RootRoute'

function Routes() {
  return (
    <NavigationContainer>
      <RootRoute />
    </NavigationContainer>
  )
}

export default Routes
