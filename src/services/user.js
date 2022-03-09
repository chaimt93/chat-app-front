import serverAPI from "src/services/serverAPI";
import {endpoints} from './constants'
import {createAccountAuth, getToken, loginAuth,authListenToAuthChanges,logoutAuth} from "src/firebase/auth";

async function login(email, password) {
  return await loginAuth(email, password)
}

async function createAccount({email, password}) {
  return await createAccountAuth({email, password})
}

async function logout() {
  await logoutAuth()
}

async function getUserToken() {
  return await getToken()
}

async function listenToAuthChanges(callBack) {
  return await authListenToAuthChanges(callBack)
}

async function saveUserInDB({user, token}) {
  return await serverAPI({url: endpoints.createUser, method: "post", payload: {user, token}})
}

async function getUser( token) {
  return await serverAPI({url: endpoints.getUser, method: "post", payload: {token}})
}


export default {
  createAccount,
  getUserToken,
  saveUserInDB,
  getUser,
  login,
  logout,
  listenToAuthChanges,
}
