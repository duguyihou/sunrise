import { StackNavigationProps } from 'typings/route'

export const getPrevRoute = (navigation: StackNavigationProps) => {
  const { routes } = navigation.getState()
  return routes[routes.length - 2]
}
