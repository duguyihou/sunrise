import { StackNavigationProps } from 'typings/route'

function getPrevRoute(navigation: StackNavigationProps) {
  const { routes } = navigation.getState()
  if (routes.length < 2) return
  // eslint-disable-next-line consistent-return
  return routes[routes.length - 2]
}

export default getPrevRoute
