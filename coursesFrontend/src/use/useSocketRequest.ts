import { useWebSocket } from '@vueuse/core'
import { errorHandler } from '@/utils/errorHandler'
import { watch, ref } from 'vue'

const defaultOptions: { immediate: boolean; autoReconnect: boolean | { delay: number } } = {
  immediate: true,
  autoReconnect: { delay: 3000 },
}

export const useSocketRequest = (url: string, options = defaultOptions) => {
  const { immediate, autoReconnect } = options

  const parsedData = ref()

  const setDataHandler = () => {
    parsedData.value = JSON.parse(data.value)

    if (parsedData.value.error) {
      errorHandler(parsedData.value.error)
      parsedData.value = undefined
    }
  }

  const { status, data, open, close } = useWebSocket(url, {
    immediate,
    autoReconnect,
    onError() {
      errorHandler('Failed to connect WebSocket')
      close()
      parsedData.value = undefined
    },
  })

  watch(() => data.value, setDataHandler)

  return { open, close, parsedData, status }
}
