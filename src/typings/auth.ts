export interface Auth {
  accessToken: string
  accessTokenExpirationDate: string
  idToken: string
  scopes: string[]
  refreshToken: string
}

export interface Access {
  access_token: string
  expires_in: string
  scope: string
  token_type: string
  id_token: string
}

export interface RefreshAccessTokenPayload {
  client_id: string
  client_secret: string
  grant_type: string
  refresh_token: string
}
