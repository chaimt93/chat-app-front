import userService from '../../services/user';

export async function createAccount({commit, dispatch, rootState}, data) {
  try {
    const {user} = await userService.createAccount(data);
    if (user) {
      localStorage.setItem('user',JSON.stringify({...data,id:user.uid}));
      commit('setUser',{...data,id:user.uid})
      await dispatch('saveUserInDB',{...data,id:user.uid});
      return {success: true}
    }
  } catch (error) {
    console.error(error)
  }
}

export async function saveUserInDB({commit, dispatch, rootState}, user) {
  try {
    const token = await userService.getUserToken()
    await userService.saveUserInDB({user,token});
    }
   catch (error) {
    console.error(error)
  }
}

export async function login({commit, dispatch, state}, {email, password}) {
  try {
    await userService.login(email, password);
    const token = await userService.getUserToken();
    const {user} = await userService.getUser(token);
    localStorage.setItem('user',JSON.stringify(user));
    commit('setUser',user);
    return {success:true}
  } catch (error) {
    console.error(error)
  }
}

export async function getUser({commit, dispatch, state}) {
  try {
    await userService.listenToAuthChanges(async({uid})=>{
      const token = await userService.getUserToken();
      const {user} = await userService.getUser(token);
      localStorage.setItem('user',JSON.stringify(user));
      commit('setUser',user);
    });
  } catch (error) {
    console.error(error)
  }
}

export async function logout({commit, dispatch, state}) {
  try {
    await userService.logout();
    commit('setUser', null);
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    console.error(error)
  }
}

export async function getMyToken({commit, dispatch, state}) {
  try {
    return await userService.getUserToken()
  } catch (error) {
    console.error(error)
  }
}

