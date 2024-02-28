import { createRouter, createWebHistory } from 'vue-router'
import { pagesTitles } from '@/constants/modules/pagesMeta'
import { routes } from '@/router/routes'
import { setTitleHandler } from '@/use/useSetTitle'
import { prefetchLinks } from '@/utils/prefetchLinks'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes
})

router.beforeEach(to => {

  Object.entries(pagesTitles).find(el => {
    Object.entries(el[1]).find(el2 => {
      if (`${el[0]}.${el2[0]}` === to.name) {
        setTitleHandler(el2[1])

        return
      }
    })
  })
})

router.afterEach(() => {
  prefetchLinks()
})

router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message) && navigator.onLine) {
    window.location.reload()
  }

  if (String(error?.message).startsWith('Failed to fetch dynamically imported module')) {
    window.location.href = router.resolve(location).href
  }
})

export default router
