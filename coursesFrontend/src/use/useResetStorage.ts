import { useStorage } from '@vueuse/core'

export const clearSessionStoragesFunctions = useStorage('session-array', {}, sessionStorage)

export const clearLocalStoragesFunctions = useStorage('local-array', {}, localStorage)

export const resetHandler = state => {
  Object.values(state || {})?.forEach((clearFunction: void) => {
    if (typeof clearFunction === 'function') {
      clearFunction()
    }
  })
}

export const useClearStorage = () => {
  // session storage
  resetHandler(clearSessionStoragesFunctions.value)

  clearSessionStoragesFunctions.value = {}

  //local storage
  resetHandler(clearLocalStoragesFunctions.value)

  clearLocalStoragesFunctions.value = {}
}
