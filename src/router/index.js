import {route, store} from 'quasar/wrappers'
import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'


export default route(function ({store}) {
  const Router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    routes,
    history: createWebHistory()
  })
  Router.beforeEach(async (to, from, next) => {
    const isLoggedIn = checkIfLoggedIn();
    if (!isLoggedIn && !to.meta.authNotRequired) {
      next('/login')
      return
    }
    next()
  })
  return Router
})

const checkIfLoggedIn= ()=> JSON.parse(localStorage.getItem('user'))!= null;

