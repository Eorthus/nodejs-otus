import { date as dayjs } from '@/setups/dayjs'

import { dateFormat, timeFormat, dateTimeFormat } from '@/constants/modules/dateTime'

export const dateFormatter = (date: string, format = dateFormat) => {
  const dateObject = dayjs(date)

  if (!dateObject.isValid()) {
    return date
  }

  return dateObject.format(format)
}
export const timeFormatter = (date: string) => {
  const dateObject = dayjs(date)

  if (!dateObject.isValid()) {
    return date
  }

  return dateObject.format(timeFormat)
}
export const dateTimeFormatter = (date: string) => {
  const dateObject = dayjs(date)

  if (!dateObject.isValid()) {
    return date
  }

  return dateObject.format(dateTimeFormat)
}
