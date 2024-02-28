import { ROUTE_NAMES } from '@/constants/modules/routeNames'

export const coursesRoutes = {
  path: '/courses',
  name: ROUTE_NAMES.courses.list,
  component: () => import('@/views/courses/CoursesView.vue'),
}
export const courseCardRoutes = {
  name: ROUTE_NAMES.courses.card,
  path: '/courses/:id',
  component: () => import('@/views/course/CourseView.vue'),
  meta: {
    layout: 'MainLayout',
  },
}
