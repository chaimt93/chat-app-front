import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import user from './user';
import chats from './chats';

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      chats
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
