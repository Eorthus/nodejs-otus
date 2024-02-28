import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const isShownConfirmModal = ref(false)

let resolve = () => undefined

let reject = () => undefined

export const modalMessage = ref()

// eslint-disable-next-line no-unused-vars
export const useRouteLeave = (
  condition: (to: object) => boolean,
  successHandler: (next: () => void) => void,
  message?: { title: string; description: string }
) => {
  modalMessage.value = message
  // eslint-disable-next-line no-unused-vars
  const routeLeaveHandler = (to: object, next: (flag?: boolean) => void) => {
    if (condition(to)) {
      next()

      return
    }

    return new Promise((res, rej) => {
      resolve = res as () => undefined
      reject = rej as () => undefined

      isShownConfirmModal.value = true
    })
      .then(() => successHandler(next))
      .catch(() => next(false))
      .finally(() => (isShownConfirmModal.value = false))
  }

  onBeforeRouteLeave((to, from, next) => routeLeaveHandler(to, next))
}

export const useRouteLeaveModal = () => {
  const resolveHnadler = () => {
    resolve()
  }

  const rejectHandler = () => {
    reject()
    modalMessage.value = undefined
  }

  return {
    isShownConfirmModal,
    resolve: resolveHnadler,
    reject: rejectHandler,
    modalMessage,
  }
}
