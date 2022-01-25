import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import(/* webpackChunkName: "music" */ '../views/music')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/profile')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import(/* webpackChunkName: "music" */ '../views/video')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
