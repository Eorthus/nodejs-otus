// import { computed, inject, onMounted, watch, ref } from 'vue'
// import { DFormInjectionKey } from '@/lib/components/globals/DForm/DForm.types'
// import { requiredRule } from '@/utils/rulesMap'
// import useVuelidate from '@vuelidate/core'

// /**
//  * @rules
//  * бери правила из rulesMap
//  *
//  */

// export const useValidationItem = (
//   props: { vid?: string; rules?: object; modelValue?: any; required?: boolean },
//   dirty = true,
//   customRules = {}
// ) => {
//   const validationProvided = inject(DFormInjectionKey, () => undefined, false)

//   //@ts-ignore
//   const validator = computed(() => validationProvided?.validator?.value)

//   const vid = computed(() => props.vid ?? 'unvalid')

//   const individualForm = computed(() => ({ [vid.value]: props.modelValue }))

//   const individualRules = ref()

//   const individualValidator = useVuelidate(individualRules, individualForm, { $autoDirty: dirty })

//   const errorMessages = computed(() => {
//     if (validator.value) {
//       return {
//         ...validator.value[vid.value]?.$errors,
//         ...individualValidator.value[vid.value]?.$errors,
//       }
//     }

//     return {
//       ...individualValidator.value[vid.value]?.$errors,
//     }
//   })

//   const isRequired = computed(() => props.required)

//   const changeRulesHandler = () => {
//     individualRules.value = {
//       [vid.value]: {
//         ...props.rules,
//         ...customRules,
//         $autoDirty: dirty,
//       },
//     }

//     if (props.required) {
//       Object.assign(individualRules.value[vid.value], {
//         required: requiredRule,
//       })
//     }
//   }

//   onMounted(changeRulesHandler)

//   watch(() => props.required, changeRulesHandler)

//   return {
//     validator,
//     individualValidator,
//     individualForm,
//     errorMessages,
//     isRequired,
//   }
// }
