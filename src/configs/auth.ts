import { JSON_SERVER_API } from "./backend-base-url";

export default {
  meEndpoint: `${JSON_SERVER_API}/auth/me`,
  loginEndpoint: `${JSON_SERVER_API}/login`,
  registerEndpoint: `${JSON_SERVER_API}/register`,
  storageTokenKeyName: 'accessToken',
  storageTokenExpirationKeyName: 'expiresIn',
  onTokenExpiration: 'logout' // logout | refreshToken
}
