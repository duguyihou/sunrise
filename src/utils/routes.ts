import { RouteProp, useRoute } from '@react-navigation/native'
import { RouteName } from 'shared'
import { RootStackParamList, StackNavigationProps } from 'typings'

export const useCurrentRoute = (currentRoute: RouteName) => {
  const route = useRoute<RouteProp<RootStackParamList, typeof currentRoute>>()
  return route
}
export const getPrevRoute = (navigation: StackNavigationProps) => {
  const { routes } = navigation.getState()
  return routes[routes.length - 2]
}
