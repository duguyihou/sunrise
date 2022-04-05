import { StackNavigationProps } from 'typings/route'

function getPrevRoute(navigation: StackNavigationProps) {
  const { routes } = navigation.getState()
  if (routes.length < 2) return
  return routes[routes.length - 2]
}

export default getPrevRoute
