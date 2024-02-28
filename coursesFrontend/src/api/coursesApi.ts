import { GET } from '@/service/axios'

export const apiGetJson = async () => {
  const { data } = await GET('https://fakestoreapi.com/products')

  return data
}
