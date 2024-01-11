import { ROUTE_NAMES } from '@/constants/modules/routeNames'

export const authRoutes = {
  path: '/auth',
  name: ROUTE_NAMES.auth.main,
  component: () => import('@/views/auth/AuthView.vue'),
}
