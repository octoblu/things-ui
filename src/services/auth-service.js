import atob from 'atob'
import cookie from 'react-cookie'
import { MESHBLU_HOST } from 'config'
import MeshbluHttp from 'browser-meshblu-http'

export function getMeshbluConfig() {
  const bearerToken = cookie.load('meshbluBearerToken')

  if (!bearerToken) return null

  const bearerTokenEnvelope = atob(bearerToken)
  const bearerTokenPieces   = bearerTokenEnvelope.split(':')

  return {
    uuid: bearerTokenPieces[0],
    token: bearerTokenPieces[1],
    hostname: MESHBLU_HOST,
    port: 443,
  }
}

export function fetchOctobluUser(callback) {
  const bearerToken = cookie.load('meshbluBearerToken')

  if (!bearerToken) {
    return callback(null, null)
  }

  const meshbluConfig = getMeshbluConfig()
  const meshbluHttp = new MeshbluHttp(meshbluConfig)
  meshbluHttp.whoami(callback)
}

export function getBearerToken() {
  return cookie.load('meshbluBearerToken')
}

export function storeAuthenticationAndRedirect(nextState, replace) {
  const bearerToken = decodeURIComponent(nextState.location.query.access_token)
  const redirectUri = nextState.location.query.redirect_uri

  cookie.save('meshbluBearerToken', bearerToken, { path: '/' })

  replace(redirectUri)
}

export function destroyAuthentication() {
  cookie.remove('meshbluBearerToken', { path: '/' })
}
