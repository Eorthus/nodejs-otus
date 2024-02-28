import { ROUTE_NAMES } from '@/constants/modules/routeNames'
import { courseCardRoutes, coursesRoutes } from '@/router/modules/coursesRoutes'
import { profileRoutes } from '@/router/modules/profileRoutes'
import { authRoutes } from '@/router/modules/authRoutes'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.courses.list,
    meta: {
      layout: 'MainLayout',
    },
    component: () => import('@/views/courses/CoursesView.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/courses/CoursesView.vue'),
    name: 'dashboard',
    children: [
      coursesRoutes,
      courseCardRoutes,
      profileRoutes,
    ],
  },

  authRoutes,
  // {
  //   name: 'not-found',
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/components/cards/404.vue'),
  // },
]

export default routes
