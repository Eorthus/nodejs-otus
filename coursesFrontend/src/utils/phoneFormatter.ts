import parsePhoneNumber from 'libphonenumber-js'

export const phoneFormatter = (phone: string) => {
  return parsePhoneNumber(phone, 'RU')?.formatNational()
}
