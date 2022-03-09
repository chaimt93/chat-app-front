import {App} from './app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();


export async function createAccountAuth({email, password}) {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export async function loginAuth(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function logoutAuth() {
  return await signOut(auth)
}

export async function getToken() {
  return await auth.currentUser.getIdToken();
}

export async function authListenToAuthChanges(callBack) {
  onAuthStateChanged(auth,(user) => {
    if (user) callBack(user)
  });
}


