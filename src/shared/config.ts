import Config from 'react-native-config'

export const config = {
  issuer: 'https://accounts.google.com',
  clientId: `${Config.CLIENT_ID}.apps.googleusercontent.com`,
  clientSecret: Config.CLIENT_SECRET,
  redirectUrl: `com.googleusercontent.apps.${Config.CLIENT_ID}:/oauth2redirect/https://www.googleapis.com/auth/tasks`,
  scopes: ['openid', 'https://www.googleapis.com/auth/tasks'],
}
