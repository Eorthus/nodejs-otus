export const valueNanHandler = (value: number) => {
  return isNaN(value) ? 0 : value
}
