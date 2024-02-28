import { errorHandler } from '@/utils/errorHandler'
import { ref } from 'vue'

type HandleRequestArgsType = {
  apiMethod: () => Promise<any>
  callback?: () => void
  customErrorHandler?: (err: any) => void
}

export const useRequestHelper = () => {
  const isLoading = ref()

  const errorMessage = ref()

  const responseData = ref()

  const handleRequest = async ({ apiMethod, callback, customErrorHandler }: HandleRequestArgsType) => {
    isLoading.value = true
    errorMessage.value = undefined

    try {
      const res = await apiMethod()

      if (res) {
        responseData.value = res
        if (callback) {
          callback()
        }
      }
    } catch (err: any) {
      errorMessage.value = err.message // <-- дописать логику
      //  (мб общий парсер ощибок сделать , общий с тостами)

      if (customErrorHandler) {
        customErrorHandler(err)
      } else {
        errorHandler(err)
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    handleRequest,
    errorMessage,
    responseData,
  }
}
