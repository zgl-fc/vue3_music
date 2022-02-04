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
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import(/* webpackChunkName: "music" */ '../views/rank')
  },
  {
    path: '/detail-video',
    name: 'DetailVideo',
    component: () =>
      import(/* webpackChunkName: "detail-video" */ '../views/detail-video')
  },
  {
    path: '/song-search',
    name: 'SongSearch',
    component: () =>
      import(/* webpackChunkName: "song-search" */ '../views/song-search')
  },
  {
    path: '/detail-song-list',
    name: 'DetailSongList',
    component: () =>
      import(
        /* webpackChunkName: "detail-song-list" */ '../views/detail-song-list'
      )
  },
  {
    path: '/more-song-menu',
    name: 'MoreSongMenu',
    component: () =>
      import(/* webpackChunkName: "more-song-menu" */ '../views/more-song-menu')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
