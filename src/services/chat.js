import serverAPI from "src/services/serverAPI";
import userService from "src/services/user";
import {endpoints} from "./constants";


async function sendMessage({user,chatUser,message}) {
  const token = await userService.getUserToken()
  return await serverAPI({url:endpoints.sendMessage, method:"post", payload: {user,chatUser,message,token}} );
}


export default {
  sendMessage,
}
