import Config from 'react-native-config'

export const config = {
  issuer: 'https://accounts.google.com',
  clientId: `${Config.GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${Config.GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/https://www.googleapis.com/auth/tasks`,
  scopes: ['openid', 'https://www.googleapis.com/auth/tasks'],
}
