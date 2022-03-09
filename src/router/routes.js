const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { path: 'chats' } },
      { path: 'login', component: () => import('pages/auth/login') ,meta:{authNotRequired:true}},
      { path: 'register', component: () => import('pages/auth/register') ,meta:{authNotRequired:true}},
      { path: 'chats', component: () => import('pages/chats/chatPage') ,meta:{authNotRequired:false}},

    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
    ,meta:{authNotRequired:true}
  }
]

export default routes
