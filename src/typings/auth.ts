export interface Auth {
  accessToken: string
  accessTokenExpirationDate: string
  idToken: string
  scopes: string[]
  refreshToken: string
}

export interface AccessToken {
  accessToken: string
  expires_in: string
  scope: string
  token_type: string
  id_token: string
}
