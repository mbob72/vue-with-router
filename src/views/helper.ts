import {
  customRef,
  shallowReactive,
  toRaw,
  markRaw,
  computed,
  effectScope,
  onScopeDispose,
  ref,
  onUnmounted,
  getCurrentScope,
  shallowReadonly,
} from 'vue'

export const makeMap = () => new Map<string, { name: string; surname: string }>()
export const useDebounceRef = (value: string, delay: number) => {
  let result = value
  let timer: number | null = null
  return customRef((track, trigger) => ({
    get() {
      track()
      return result
    },
    set(newValue) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        result = newValue
        trigger()
      }, delay)
    },
  }))
}

export const useProductsStore = <T extends object>(init: T[]) => {
  const state = shallowReactive({
    data: init.map((i) => markRaw(i)),
  })
  function add(item: T) {
    state.data.push(markRaw(item))
  }
  const rowArray = computed(() => toRaw(state.data))

  return {
    state,
    add,
    rowArray,
  }
}

export const useMouseTracker = (componentRef: HTMLElement) => {
  if (!getCurrentScope()) {
    console.warn('useMouseTracker must be used inside setup()')
  }
  const scope = effectScope()

  const x = ref(0)

  const y = ref(0)

  scope.run(() => {
    function handler(event: MouseEvent) {
      x.value = event.clientX
      y.value = event.clientY
    }

    componentRef.addEventListener('mousemove', handler)

    onScopeDispose(() => {
      componentRef.removeEventListener('mousemove', handler)
    })
  })

  onUnmounted(() => scope.stop())

  return {
    x,
    y,
    scope,
  }
}

export function useAppConfig<T extends Record<string, unknown> & { version: string }>(
  init: T,
  options?: { admin: boolean },
) {
  const value = shallowReadonly<T & { getWritableConfig?: () => void }>({
    ...toRaw(init),
    getWritableConfig,
  })

  function getWritableConfig() {
    return toRaw(value)
  }

  if (options?.admin) {
    return getWritableConfig()
  }
  return value
}
