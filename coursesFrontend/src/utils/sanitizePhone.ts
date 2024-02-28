import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'
//@ts-ignore
window.parsePhoneNumber = parsePhoneNumber

const sanitizePhone = (input: string, country: CountryCode) => {
  if (typeof input !== 'string') {
    return input
  }
  const number = input.replace(/[^+\d]/g, '').trim()

  if (number.length < 9 || number.length > 17) {
    return number
  }
  const parsedPhone = parsePhoneNumber(number, country) || {} /* number */

  //@ts-ignore
  const phone = parsedPhone?.isValid() ? parsedPhone?.formatInternational() : number

  return phone
}

export default sanitizePhone
