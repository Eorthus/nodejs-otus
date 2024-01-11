// import { and, between, email, helpers, minLength, numeric, required } from '@vuelidate/validators'
// import { date as dayjs } from '@/setups/dayjs'
// import { DCalendarFormatsMap } from '@/lib/components/ui/DComponents/DCalendar/DCalendar.types'

// const emailReg =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/

// const urlReg = /[-\w@:%.+~#=]{1,256}\.[a-z\d()]{1,6}\b([-\w()@:%+.~#?&/=]*)?/gi

// export const requiredRule = helpers.withMessage('Обязательно для заполнения', required)

// export const dateRule = helpers.withMessage(
//   'Дата должна быть старше текущей',
//   (value: string) => new Date() <= dayjs(value, DCalendarFormatsMap.date).toDate() || !helpers.req(value)
// )

// export const timeRule = helpers.withMessage('', (value: string) => !helpers.req(value) || validateTime(value))

// const checkIsValideDate = (value: string | undefined) => {
//   if (!value) {
//     return true // вопросы к required, if false - show error
//   }

//   // Парсим входное значение даты
//   const parsedDate = dayjs(value, DCalendarFormatsMap.date)

//   // Проверяем, что значение соответствует формату даты и не пустое
//   if (!parsedDate.isValid()) {
//     return false // if false - show error
//   }

//   const [day, month, year] = value?.split('.') || []

//   // отсекаем 29.02.2023 (парсер берет след месяц, а значит кривой день введен)
//   if (parsedDate.month() + 1 !== +month || parsedDate.date() !== +day) {
//     // "Не валидная дата"
//     return false // if false - show error
//   }
//   const isValid = +year > 1970 && +year < 2222 // prevent '0000'

//   return isValid // if false - show error
// }

// type CompareMethod = 'isBefore' | 'isAfter' | 'isSameOrAfter' | 'isSameOrBefore'

// const compareDates = (value: string | undefined, compareMethod: CompareMethod, compareWithDay = dayjs()) => {
//   // Парсим входное значение даты
//   const parsedDate = dayjs(value, DCalendarFormatsMap.date)

//   // [------------ !0 ----------]

//   // проверка на условие даты младше или старше
//   const compareWithDayFixed = checkIsValideDate(compareWithDay.format(DCalendarFormatsMap.date))
//     ? compareWithDay
//     : dayjs()

//   const methodExtremum = ['isSameOrAfter', 'isAfter'].includes(compareMethod) ? 'startOf' : 'endOf'

//   const compareWithDayFixedExtreme = compareWithDayFixed[methodExtremum]('day')

//   // Проверяем, что дата </> текущей
//   const compared = parsedDate[compareMethod](compareWithDayFixedExtreme)

//   return compared
// }

// export const dateFutureRules = helpers.withMessage('Дата должна быть старше текущей', (value: string) => {
//   return !helpers.req(value) || compareDates(value, 'isSameOrAfter')
// })

// export const dateFutureRulesWithDay = helpers.withMessage('Дата должна быть старше текущей', (value: string) => {
//   return !helpers.req(value) || compareDates(value, 'isAfter')
//   // return !helpers.req(value) || compareDates(value, 'isSameOrAfter')
// })

// export const dateBetweenRules = ({
//   min,
//   max,
//   method = 'both',
// }: {
//   min: string | 'year'
//   max: string | 'year'
//   method: 'both' | CompareMethod
// }) => {
//   let errorText = ''

//   const minFormatted = min === 'year' ? dayjs().subtract(1, 'year').format(DCalendarFormatsMap.date) : min

//   const maxFormatted = max === 'year' ? dayjs().add(1, 'year').format(DCalendarFormatsMap.date) : max

//   if (method === 'both') {
//     errorText = `Дата должна быть между ${minFormatted} и ${maxFormatted}`
//   } else if (['isSameOrBefore', 'isBefore'].includes(method)) {
//     errorText = `Дата должна быть не позднее ${maxFormatted}`
//   } else if (['isSameOrAfter', 'isAfter'].includes(method)) {
//     errorText = `Дата должна быть не ранее ${minFormatted}`
//   }

//   return helpers.withMessage(
//     () => errorText,
//     (value: string) => {
//       if (!helpers.req(value)) {
//         return true
//       }
//       if (!checkIsValideDate(value)) {
//         return true
//       }

//       let isOk = false

//       if (method === 'both') {
//         isOk = dayjs(value, DCalendarFormatsMap.date).isBetween(
//           dayjs(minFormatted, DCalendarFormatsMap.date),
//           dayjs(maxFormatted, DCalendarFormatsMap.date),
//           null,
//           '[]'
//         )
//       } else if (['isSameOrBefore', 'isBefore'].includes(method)) {
//         isOk = compareDates(value, method, dayjs(maxFormatted, DCalendarFormatsMap.date))
//       } else if (['isSameOrAfter', 'isAfter'].includes(method)) {
//         isOk = compareDates(value, method, dayjs(minFormatted, DCalendarFormatsMap.date))
//       }

//       console.log({ isOk })

//       return isOk
//     }
//   )
// }

// // the name used in DFormMessage.vue
// export const dateIsValidRules = helpers.withMessage('Не валидная дата', (value: string) => {
//   return !helpers.req(value) || checkIsValideDate(value)
// })

// export const datePastRules = helpers.withMessage('Дата должна быть меньше текущей', (value?: string) => {
//   return !helpers.req(value) || compareDates(value, 'isBefore')
// })

// export const minPlaceWeightRule = helpers.withMessage(
//   'Вес места должен быть больше 0кг',
//   helpers.regex(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/)
// )

// export const maxPlaceWeightRule = helpers.withMessage('Вес места должен быть меньше 50кг', (value: number) => {
//   if (!value) {
//     return true
//   }

//   return value < 50
// })

// export const emailRule = helpers.withMessage('Почта должна быть валидна', and(email, helpers.regex(emailReg)))

// export const siteRule = helpers.withMessage('Сайт не валиден', helpers.regex(urlReg))

// export const numberRule = helpers.withMessage(' Введите валидное число', numeric)

// export const telRule = helpers.withMessage(' Введите валидный номер телефона', minLength(18))

// export const declaredOrderRule = helpers.withMessage('Недопустимое значение', between(0.01, 150000))

// export const streetRule = helpers.withMessage(
//   'Введите полный адрес',
//   (value: { complete: boolean }) => !helpers.req(value) || Boolean(value?.complete)
// )

// export const addressRule = helpers.withMessage(
//   'Введите полный адрес',
//   (value: { city?: string; area?: string; region?: string; street?: string; settlement?: string; house?: number }) =>
//     !helpers.req(value) ||
//     Boolean((value.city || value.area || value.region) && (value.street || value.settlement) && value.house)
// )

// export const bikRule = helpers.withMessage(
//   'Введите валидный БИК',
//   (value: { value: number }) => !helpers.req(value) || validateBik(value.label)
// )

// export const innRule = helpers.withMessage(
//   'Введите валидный ИНН',
//   (value: { value: string }) => !helpers.req(value) || validateInn(value.label)
// )

// export const kppRule = helpers.withMessage(
//   'Введите валидный КПП',
//   (value: string) => validateKpp(value) || !helpers.req(value)
// )

// export const ksRule = helpers.withMessage(
//   'Введите валидный КС',
//   (value: number) => validateKs(value) || !helpers.req(value)
// )

// export const rsRule = helpers.withMessage(
//   'Введите валидный РС',
//   (value: number) => validateRs(value) || !helpers.req(value)
// )

// export const ogrnRule = helpers.withMessage(
//   'Введите валидный ОГРН',
//   (value: number) => validateOgrn(value) || !helpers.req(value)
// )

// export const ogrnipRule = helpers.withMessage(
//   'Введите валидный ОГРНИП',
//   (value: number) => validateOgrnip(value) || !helpers.req(value)
// )

// const validateTime = (time: string) => {
//   const data = time.split(':')

//   return +data[0] < 24 && time.length === 5 && +data[1] < 60
// }

// const validateOgrn = (ogrn: number) => {
//   const item = String(ogrn)

//   const controlNumber = +String(+item.slice(0, -1) % 11).slice(-1)

//   return item.length === 13 && !/\D/.test(item) && controlNumber === +item[12]
// }

// const validateOgrnip = (ogrnip: number) => {
//   const item = String(ogrnip)

//   const controlNumber = +String(+item.slice(0, -1) % 13).slice(-1)

//   return item.length === 15 && !/\D/.test(item) && controlNumber === +item[14]
// }

// const validateKs = (ks: number) => {
//   return String(ks).slice(0, 5) === '30101' && /^\d{20}$/.test(String(ks))
// }

// const validateRs = (ks: number) => {
//   const organizations = ['405', '406', '407', '408']

//   return organizations.findIndex(el => String(ks).slice(0, 3) === el) !== -1 && /^\d{20}$/.test(String(ks))
// }

// const validateBik = (bin: string | number) => {
//   // преобразуем в строку
//   const value = `${bin}`

//   if (!/^\d{9}$/.test(value)) {
//     return false
//   }
//   const thirdPart = value.slice(-3)

//   if (+thirdPart === 0 || +thirdPart === 1 || +thirdPart === 2) {
//     // спец. значения
//     return true
//   }

//   return +thirdPart >= 50 && +thirdPart < 1000
// }

// const validateKpp = (kpp: string) => {
//   return kpp.length === 9 && /^\d{4}[\dA-Z]{2}\d{3}$/.test(kpp)
// }

// const validateInn = (inn: string) => {
//   // преобразуем в строку

//   if (!/^\d{10}$/.test(inn) && !/^\d{12}$/.test(inn)) {
//     return false
//   }

//   // преобразуем в массив
//   const value: number[] = inn.split('').map(el => +el)

//   // для ИНН в 10 знаков
//   if (
//     value.length === 10 &&
//     +value[9] ===
//       ((2 * value[0] +
//         4 * value[1] +
//         10 * value[2] +
//         3 * value[3] +
//         5 * value[4] +
//         9 * value[5] +
//         4 * value[6] +
//         6 * value[7] +
//         8 * value[8]) %
//         11) %
//         10
//   ) {
//     return true
//   }

//   // для ИНН в 12 знаков
//   return (
//     value.length === 12 &&
//     +value[10] ===
//       ((7 * value[0] +
//         2 * value[1] +
//         4 * value[2] +
//         10 * value[3] +
//         3 * value[4] +
//         5 * value[5] +
//         9 * value[6] +
//         4 * value[7] +
//         6 * value[8] +
//         8 * value[9]) %
//         11) %
//         10 &&
//     +value[11] ===
//       ((3 * value[0] +
//         7 * value[1] +
//         2 * value[2] +
//         4 * value[3] +
//         10 * value[4] +
//         3 * value[5] +
//         5 * value[6] +
//         9 * value[7] +
//         4 * value[8] +
//         6 * value[9] +
//         8 * value[10]) %
//         11) %
//         10
//   )
// }
