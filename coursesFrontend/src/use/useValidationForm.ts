// import { provide, computed, ref } from 'vue'
// import { DFormInjectionKey } from '@/lib/components/globals/DForm/DForm.types'
// import useVuelidate from '@vuelidate/core'

// /**
//  * @rules
//  * бери правила из rulesMap
//  *
//  */

// export const useFormValidation = (rules: object, form: object /*{ disabled } = { disabled: false }*/) => {
//   //
//   const validator = useVuelidate(rules, form, { $autoDirty: true })

//   // if (!disabled) {
//   provide(/* key */ DFormInjectionKey, /* value */ { validator })
//   // }

//   const isValid = computed(() => !validator.value.$invalid)

//   return {
//     validator,
//     isValid,
//   }
// }

// export const isTriggeredForm = ref(false)
