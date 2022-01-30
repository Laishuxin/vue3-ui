import { inject, provide, Ref, ref } from 'vue'

export interface IContext {
  currentIndex: Ref<number>
  setCurrentIndex(index: number): void
}

export const useCarouselKey = Symbol('use-carousel')
export const useCarouselProvide = (initial: number) => {
  const currentIndex = ref(initial)
  const setCurrentIndex = (index: number) => {
    currentIndex.value = index
  }

  provide(useCarouselKey, {
    currentIndex,
    setCurrentIndex,
  })
  return {
    currentIndex,
    setCurrentIndex,
  }
}

export const useCarouseInject = () => {
  const ctx = inject<IContext>(useCarouselKey)
  if (!ctx) {
    throw new Error('useCarouselInject must be used inside useCarouselProvide')
  }
  return ctx
}
