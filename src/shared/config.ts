import Config from 'react-native-config'

export const config = {
  issuer: 'https://accounts.google.com',
  clientId: `${Config.GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${Config.GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile'],
}
