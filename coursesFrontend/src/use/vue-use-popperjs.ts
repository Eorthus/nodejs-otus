// import { Ref, onMounted, onUnmounted, onUpdated, ref, unref, watch } from 'vue'
// import { Modifier, PositioningStrategy, State, createPopper } from '@popperjs/core'
// import { Placement } from 'tippy.js'
// // import { IS_DEV } from '@/constants/env.js'
// const IS_DEV = true

// const LoggerPrefix = '[Vue-use-popperjs]:'

// export const warn = (...args: any[]) => {
//   console.warn(LoggerPrefix, ...args)
// }

// function on(element: Document, event: string, handler: (e: Event) => void) {
//   if (element && event && handler) {
//     element.addEventListener(event, handler, false)
//   }
// }

// function off(element: Document, event: string, handler: (e: Event) => void) {
//   if (element && event) {
//     element.removeEventListener(event, handler, false)
//   }
// }

// const defaultTrigger = 'hover'

// type OptionsType = {
//   placement?: Placement | undefined
//   modifiers?: Partial<Modifier<any, any>>[]
//   strategy?: PositioningStrategy
//   onFirstUpdate?: (value: Partial<State>) => void
//   delayOnMouseover?: number
//   delayOnMouseset?: number
//   delayOnMouseout?: number
//   trigger?: string
//   forceShow?: boolean
//   onShow?: () => void
//   onHide?: () => void
// }

// export function usePopperjs(reference: Ref, popper: Ref, options: OptionsType = {}) {
//   const isMounted = ref(false)

//   const updatedFlag = ref(true)

//   const instance = ref()

//   const referenceRef = ref()

//   const popperRef = ref()

//   const visible = ref(false)

//   const timer = ref()

//   const doToggle = () => (visible.value = !visible.value)

//   const doOpen = () => (visible.value = true)

//   const doClose = () => (visible.value = false)

//   const destroy = () => {
//     instance.value?.destroy()
//     instance.value = undefined
//   }

//   const concrete = () => {
//     instance.value = createPopper(referenceRef.value, popperRef.value, {
//       placement: options?.placement ?? 'bottom',
//       modifiers: options?.modifiers ?? [],
//       strategy: options?.strategy ?? 'absolute',
//       onFirstUpdate: options?.onFirstUpdate ?? undefined,
//     })
//   }

//   const doMouseover = () => {
//     if (unref(options?.delayOnMouseover) === 0) {
//       doOpen()
//     } else {
//       clearTimeout(timer.value)
//       timer.value = setTimeout(() => {
//         doOpen()
//       }, unref(options?.delayOnMouseover) ?? 200)
//     }
//   }

//   const doMouseout = () => {
//     if (unref(options?.delayOnMouseout) === 0) {
//       doClose()
//     } else {
//       clearTimeout(timer.value)
//       timer.value = setTimeout(() => {
//         doClose()
//       }, unref(options?.delayOnMouseout) ?? 200)
//     }
//   }

//   const doCloseForDocument = (e: Event) => {
//     if (referenceRef.value?.contains(e.target)) {
//       return
//     }
//     if (popperRef.value?.contains(e.target)) {
//       return
//     }
//     doClose()
//   }

//   const doOff = () => {
//     off(referenceRef.value, 'click', doOpen)
//     off(document, 'click', doCloseForDocument)

//     off(referenceRef.value, 'click', doToggle)

//     off(referenceRef.value, 'mouseover', doMouseover)
//     off(popperRef.value, 'mouseover', doMouseover)
//     off(referenceRef.value, 'mouseout', doMouseout)
//     off(popperRef.value, 'mouseout', doMouseout)

//     off(referenceRef.value, 'focus', doOpen)
//     off(popperRef.value, 'focus', doOpen)
//     off(referenceRef.value, 'blur', doClose)
//     off(popperRef.value, 'blur', doClose)
//   }

//   const doOn = () => {
//     doOff()

//     switch (unref(options?.trigger) ?? defaultTrigger) {
//       case 'click-to-open': {
//         on(referenceRef.value, 'click', doOpen)
//         on(document, 'click', doCloseForDocument)
//         break
//       }

//       case 'click-to-toggle': {
//         on(referenceRef.value, 'click', doToggle)
//         on(document, 'click', doCloseForDocument)
//         break
//       }

//       case 'hover': {
//         on(referenceRef.value, 'mouseover', doMouseover)
//         on(popperRef.value, 'mouseover', doMouseover)
//         on(referenceRef.value, 'mouseout', doMouseout)
//         on(popperRef.value, 'mouseout', doMouseout)
//         break
//       }

//       case 'focus': {
//         on(referenceRef.value, 'focus', doOpen)
//         on(popperRef.value, 'focus', doOpen)
//         on(referenceRef.value, 'blur', doClose)
//         on(popperRef.value, 'blur', doClose)
//         break
//       }

//       case 'manual': {
//         break
//       }

//       default: {
//         throw TypeError()
//       }
//     }
//   }

//   onMounted(() => {
//     isMounted.value = true
//   })
//   onUnmounted(() => {
//     isMounted.value = false
//     destroy()
//   })

//   onUpdated(() => {
//     updatedFlag.value = !updatedFlag.value
//   })

//   watch(
//     () => [isMounted.value, updatedFlag.value],
//     () => {
//       if (!isMounted.value) {
//         return
//       }

//       if (unref(reference)?.$el) {
//         referenceRef.value = unref(reference).$el
//       } else {
//         referenceRef.value = unref(reference)
//       }

//       if (unref(popper)?.$el) {
//         popperRef.value = unref(popper).$el
//       } else {
//         popperRef.value = unref(popper)
//       }
//     }
//   )

//   watch(
//     () => [referenceRef.value, popperRef.value],
//     () => {
//       destroy()
//       if (!referenceRef.value) {
//         return
//       }
//       if (!popperRef.value) {
//         return
//       }

//       concrete()
//     }
//   )

//   watch(
//     () => [instance.value, unref(options?.trigger), unref(options?.forceShow)],
//     () => {
//       if (!instance.value) {
//         return
//       }

//       if (unref(options?.forceShow)) {
//         visible.value = true
//         doOff()

//         return
//       }

//       doOn()
//     }
//   )

//   watch(
//     () => unref(options?.forceShow),
//     () => {
//       if (unref(options?.forceShow)) {
//         return
//       }
//       if (unref(options?.trigger) === 'manual') {
//         return
//       }

//       visible.value = false
//     }
//   )

//   watch(
//     () => [instance.value, visible.value],
//     () => {
//       if (!instance.value) {
//         return
//       }

//       if (visible.value || unref(options?.forceShow)) {
//         popperRef.value?.classList.remove('vue-use-popperjs-none')
//         options?.onShow?.()
//         instance.value?.update()
//       } else {
//         popperRef.value?.classList.add('vue-use-popperjs-none')
//         options?.onHide?.()
//       }
//     }
//   )

//   if (IS_DEV) {
//     watch(
//       () => [unref(options?.trigger), unref(options?.delayOnMouseover), unref(options?.delayOnMouseout)],
//       () => {
//         if ((unref(options?.trigger) ?? defaultTrigger) === 'hover') {
//           return
//         }

//         if (unref(options?.delayOnMouseover) !== undefined) {
//           warn('`delayOnMouseover` only works with `trigger=hover`')
//         }

//         if (unref(options?.delayOnMouseout) !== undefined) {
//           warn('`delayOnMouseout` only works with `trigger=hover`')
//         }
//       },
//       { immediate: true, deep: true }
//     )
//   }

//   return {
//     instance,
//     visible,
//   }
// }
