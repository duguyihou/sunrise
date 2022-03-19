import { StackNavigationProps } from 'typings'

export const getPrevRoute = (navigation: StackNavigationProps) => {
  const { routes } = navigation.getState()
  return routes[routes.length - 2]
}
