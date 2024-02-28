const defaultOptions: {
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero'
  showPenny?: boolean
} = {
  showPenny: true,
  signDisplay: 'auto',
}

export const formatMoney = (value: number | undefined, { showPenny = true, signDisplay = 'auto' } = defaultOptions) => {
  if (Number.isNaN(value)) {
    return value
  }

  let res = String(value)

  const devider = showPenny ? '.' : ','

  if (res.length === 1) {
    res = `0${devider}0${res}`
  } else if (res.length === 2) {
    res = `0${devider}` + res.slice(-2)
  } else {
    res = res.slice(0, res.length - 2) + devider + res.slice(-2)
  }

  if (!showPenny) {
    return res.slice(-2) === '00' ? res.replace(/\D00(?=\D*$)/, '') : res
  }

  const data: {
    style: string
    currency: string
    signDisplay: 'auto' | 'never' | 'always' | 'exceptZero'
    options: { minimumIntegerDigits: number; maximumFractionDigits: number }
  } = {
    style: 'currency',
    currency: 'RUB',
    signDisplay: signDisplay,
    options: {
      minimumIntegerDigits: 1,
      maximumFractionDigits: 2,
    },
  }

  return res.slice(-2) === '00'
    ? new Intl.NumberFormat('ru-RU', data).format(+res).replace(/\D00(?=\D*$)/, '')
    : new Intl.NumberFormat('ru-RU', data).format(+res)
}
