import axios from 'axios'

const axiosApiInstance = axios.create()

const makeRequest = (method: string, url: string, payload: any | undefined, opts = {}) => {
  return axiosApiInstance({
    url,
    method,
    // cancelToken,
    params: method === 'get' ? payload : undefined,
    data: method !== 'get' ? payload : undefined,
    ...opts,
  })
}

// export const { get: GET, post: POST, patch: PATCH, delete: DELETE } = axiosApiInstance
export const GET = (url:string, payload?:any, opts = {}) => makeRequest('get', url, payload, opts)
export const POST = (url:string, payload:any, opts = {}) => makeRequest('post', url, payload, opts)
export const DELETE = (url:string, payload:any, opts = {}) => makeRequest('delete', url, payload, opts)
export const PATCH = (url:string, payload:any, opts = {}) => makeRequest('patch', url, payload, opts)
export const PUT = (url:string, payload:any, opts = {}) => makeRequest('put', url, payload, opts)