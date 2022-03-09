import chatService from '../../services/chat';

export async function socketChatUpdate({commit, dispatch, state},chat) {
  try {
    chat.unRead = true;
    dispatch('updateChat',{chat})
  } catch (error) {
    console.error(error)
  }
}

export async function updateChat({commit, dispatch, state}, {chat}) {
  try {
    if (chat.users.includes(state.currentChatUser?.id))chat.unRead = false;
    const chats = [...state.chats]
    const i = chats.findIndex(c=> c.users[0] === chat.users[0] && c.users[1] === chat.users[1])
    if (i<0)chats.push(chat)
    else chats[i]=chat;
    commit('setChats',chats);
  } catch (error) {
    console.error(error)
  }
}

export async function send_message({commit, dispatch, state,rootState}, text) {
  try {
    const chatUser = state.currentChatUser;
    const user = rootState.user?.user;
    const message = {
      text,
      sender:user.id,
      time:new Date().getTime()
    }
    await chatService.sendMessage({user, chatUser, message})
  } catch (error) {
    console.error(error)
  }
}

export async function updateUsers({commit, state},user) {
  try {
    const users = state.otherUsers.filter(u=>u.id!==user.id)
    users.push(user)
    commit('setOtherUsers',users)
  } catch (error) {
    console.error(error)
  }
}
