import { ref } from 'vue'
import { routes } from '@/router/routes'
import type { RouteContext } from 'vue-router-middleware-plugin/build/types/VueTypes'

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
}

const visibleRoutes = ref<string[]>([])

const findAllRouteChildrenHandler = async (route: RouteContext) => {
  if (route.children) {
    for (const children of Object.values(route.children)) {
      //@ts-ignore
      const childerRoute: RouteContext = children

      const componentOrImporter = childerRoute.component

      //ищем объект рута среди видимых ссылок
      const isSimilarRoute = visibleRoutes.value.findIndex(el => el === childerRoute.path) >= 0

      //ищем объект рута среди ссылок с id
      const isSimilarRouteWithId =
        visibleRoutes.value.findIndex(
          el =>
            // обрезаем часть с id у ссылки и сравниваем с родителем
            el.slice(0, el.lastIndexOf('/')) === route.path ||
            // обрезаем часть с id у ссылки и рута, сравниваем
            el.slice(0, el.lastIndexOf('/')) === childerRoute.path.slice(0, childerRoute.path.indexOf(':') - 1)
        ) >= 0

      if (
        componentOrImporter &&
        typeof componentOrImporter === 'function' &&
        (isSimilarRoute || childerRoute.path === '' || isSimilarRouteWithId)
      ) {
        try {
          await componentOrImporter()
        } catch (err) {}
      }
      // запускаем проверку вложенных рутов
      findAllRouteChildrenHandler(childerRoute)
    }
  }
}

const prefetchComponentHandler = async () => {
  for (const route of routes) {
    const componentOrImporter = route.component

    //ищем объект рута среди видимых ссылок
    if (
      componentOrImporter &&
      typeof componentOrImporter === 'function' &&
      visibleRoutes.value.findIndex(el => el === route.path) >= 0
    ) {
      try {
        //@ts-ignore
        await componentOrImporter()
      } catch (err) {}
    }
    // запускаем проверку вложенных рутов
    findAllRouteChildrenHandler(route)
  }
}

const observerCallbackHandler = function () {
  const target = document.querySelectorAll('a')

  //@ts-ignore
  //формируем массив путей видимых ссылок
  const linksArray = Object.values(target)?.map(el => el.attributes.href.value)

  if (JSON.stringify(linksArray) !== JSON.stringify(visibleRoutes.value)) {
    visibleRoutes.value = linksArray
    //запускаем префетч только если произошло изменение в видимых ссылках
    prefetchComponentHandler()
  }
}

export const prefetchLinks = async () => {
  const observer = new MutationObserver(observerCallbackHandler)

  const target = document.querySelector('body')

  if (target) {
    observer.observe(target, observerConfig)
  }
}
