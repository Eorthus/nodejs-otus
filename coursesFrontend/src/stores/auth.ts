
// import { useStorage } from '@vueuse/core'
// import { ref, computed, watch } from 'vue'
// import { defineStore } from 'pinia'
// // import { apiLogin, apiTokenRefresh, LoginType, TokenType } from '@/api/authApi'
// import { useRequestHelper } from '@/use/useRequestHelper'
// import { clearLocalStoragesFunctions } from '@/use/useResetStorage'

// const { handleRequest: setLogin, isLoading: isLoadingLogin, responseData: loginResponseData } = useRequestHelper()

// const {
//   handleRequest: refreshLogin,
//   isLoading: isLoadingRefresh,
//   responseData: refreshResponseData,
// } = useRequestHelper()

// const mockToken = {
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//   tokenExpire: '2006-01-02T15:04:05Z',
// }

// export const useAuthStore = defineStore('auth', () => {
//   const userData = ref<TokenType>({
//     /*
//         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiZXhwIjoxNjExOTAyMTI0fQ.k0801FzXVSJuNUW_bvDOR-NDO5D6L9LI_nN_Pplbtrw"
//         tokenExpire: "2021-01-29T09:35:24.106118975+03:00"
//       */
//   })

//   const isLoading = computed(() => isLoadingLogin.value || isLoadingRefresh.value)

//   const loginState = useStorage('user-data', userData, localStorage)

//   const loginDataHandler = () => {
//     if (isMockMode) {
//       loginState.value = mockToken
//     } else {
//       loginState.value = loginResponseData.value
//     }
//   }

//   const refreshHandler = () => {
//     loginState.value = refreshResponseData.value
//   }

//   const unsetLoginHandler = () => {
//     loginState.value = {}
//   }

//   const loginHandler = async (payload: LoginType) => {
//     await setLogin({ apiMethod: () => apiLogin(payload) })
//   }

//   const loginRefreshHandler = () => {
//     refreshLogin({ apiMethod: () => apiTokenRefresh() })
//   }

//   const logoutHandler = () => {
//     unsetLoginHandler()
//   }

//   watch(() => loginResponseData.value, loginDataHandler)
//   watch(() => refreshResponseData.value, refreshHandler)

//   const resetLocalHandler = () => {
//     loginState.value = userData.value
//   }

//   clearLocalStoragesFunctions.value.loginState = resetLocalHandler

//   return {
//     isLoading,
//     loginState,
//     unsetLoginHandler,
//     loginHandler,
//     loginRefreshHandler,
//     logoutHandler,
//   }
// })
