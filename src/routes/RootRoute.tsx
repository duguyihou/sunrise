import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from 'hooks/app'
import DateTimeScreen from 'modules/DateTimeScreen'
import OperationModal from 'modules/OperationModal'
import SigninScreen from 'modules/SigninScreen'
import TaskDetailScreen from 'modules/TaskDetailScreen'
import TasklistScreen from 'modules/TasklistScreen'
import TasklistsScreen from 'modules/TasklistsScreen'
import React from 'react'
import { RouteName, TaskName } from 'shared/constants'
import { theme } from 'shared/theme'
import { RootStackParamList } from 'typings/route'

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootRoute() {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={RouteName.SignIn} component={SigninScreen} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.bg.primary },
        headerTintColor: theme.font.secondary,
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name={RouteName.Tasklists}
          component={TasklistsScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={RouteName.Tasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={RouteName.NewTasklist}
          component={TasklistScreen}
        />
        <RootStack.Screen
          name={RouteName.TaskDetail}
          component={TaskDetailScreen}
          options={{ title: TaskName.TaskDetail, headerBackTitle: '' }}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name={RouteName.DateTime}
          component={DateTimeScreen}
          options={{
            headerShown: false,
            presentation: 'containedTransparentModal',
          }}
        />
        <RootStack.Screen
          name={RouteName.Operation}
          component={OperationModal}
          options={{
            headerShown: false,
            presentation: 'containedTransparentModal',
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootRoute
