const hourText = (hour: number) => {
  if (hour === 1) {
    return `${hour} час`
  }
  if (hour < 5) {
    return `${hour} часа`
  }
  if (hour > 4) {
    return `${hour} часов`
  }
}

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

const createTimeInterval = (start: number, stop: number, step: number) =>
  // eslint-disable-next-line id-length
  range(start, stop, step).map(a => ({ value: a * 60, text: hourText(a) }))

const convertNumTimeToStrTime = (numTime: number) => {
  const hours = numTime / 60

  const rhours = Math.floor(hours)

  const minutes = (hours - rhours) * 60

  const rminutes = Math.round(minutes)

  return `${rhours}:${rminutes || '00'}`
}

export { createTimeInterval, hourText, convertNumTimeToStrTime }
