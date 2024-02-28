export const DATE_TIME_Z = 'YYYY-MM-DDTHH:mm:ssZ'
export const DATE_WITH_MONTH = 'DD MMMM YYYY'

export const dateFormat = 'DD.MM.YYYY'
export const reverseDateFormat = 'YYYY-MM-DD'
export const timeFormat = 'HH:mm'
export const dateTimeFormat = `${dateFormat} ${timeFormat}`

export const timeZoneRu = 'Europe/Moscow'

export const FORMAT_TYPE_KEYS = {
  date: 'date',
  time: 'time',
  dateTime: 'dateTime',
  reverseDate: 'reverseDate',
}

export const DATE_TIME_FORMATS = {
  [FORMAT_TYPE_KEYS.date]: dateFormat,
  [FORMAT_TYPE_KEYS.time]: timeFormat,
  [FORMAT_TYPE_KEYS.dateTime]: dateTimeFormat,
  [FORMAT_TYPE_KEYS.reverseDate]: reverseDateFormat,
}
