import { useTitle } from '@vueuse/core'
import { navBrand } from '@/constants/constants'

export const setTitleHandler = (title?: string) => {
  useTitle().value = title ? `${title} | ${navBrand}` : navBrand
}
