import Toast from '@/setups/toast'

const opts = {
  type: 'error',
}

const responseCodeMap = {
  401: 'Пожалуйста, войдите',
  403: 'У вас нет прав для просмотра этого раздела',
}

const errorMap = (errorMessage: string) => {
  const errors = {
    // 'Session is expired. Please re-login': ['warning', i18n.t('errors.Session is expired')],
    '404 Not Found': ['error', '404 Not Found'],
    '502 Bad Gateway': ['error', '502 Bad Gateway'],
  }

  if (typeof errorMessage === 'string') {
    const found = Object.entries(errors).find(([key]) => errorMessage.match(key))

    if (!found) {
      return
    }
    const [type, message] = found[1] || []

    return [type, message]
  }
}

const errorResolver = (error: {
  response: { data: { message?: string; Message?: string; error?: string }; status?: number }
}) => {
  if (['string', 'number'].includes(typeof error)) {
    if (String(error).match('already exists')) {
      opts.type = 'warning'
    }

    // if (error && i18n._exist(`notification.${error}`)) return i18n.t(`notification.${error}`)

    return error
  }

  if (!navigator.onLine) {
    return 'Ты не в сети'
  }

  const errMessage =
    error?.response?.data?.Message ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data

  // if (errMessage && i18n._exist(`notification.${errMessage}`)) return i18n.t(`notification.${errMessage}`)
  // if (error?.message && i18n._exist(`notification.${error.message}`)) return i18n.t(`notification.${error.message}`)
  //@ts-ignore
  const [type, message] = errorMap(errMessage) || []

  opts.type = type || opts.type
  //@ts-ignore
  const resMessage = message || responseCodeMap[error?.response?.status] || errMessage

  return resMessage
}

// обработчик ошибок тут:
export const errorHandler = (error: string) => {
  //@ts-ignore
  window.error = error
  //@ts-ignore
  const msg = errorResolver(error) || 'Что-то пошло не так'

  console.warn(msg, error)
  Toast(msg.replace('notification.', ''), opts)

  return msg
}

export default errorHandler
