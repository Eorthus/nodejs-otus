import { ROUTE_NAMES } from '@/constants/modules/routeNames'

export const profileRoutes = {
  path: '/profile',
  name: ROUTE_NAMES.profile.main,
  component: () => import('@/views/profile/ProfileView.vue'),
}