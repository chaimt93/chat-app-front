import { initializeApp } from "firebase/app";
import credentials from './credentials'
export const App = initializeApp(credentials.config);
