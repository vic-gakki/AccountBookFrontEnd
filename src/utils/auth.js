import Cookies from 'js-cookie'
// import { Base64 } from 'js-base64'

const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function basicAuthToken(){
  const token = getToken()
  let basicAuthToken = token + ':'
  // basicAuthToken = `BASIC ${Base64.encode(basicAuthToken)}`
  basicAuthToken = `BASIC ${btoa(basicAuthToken)}`
  return basicAuthToken
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
