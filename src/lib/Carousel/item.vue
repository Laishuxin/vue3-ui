<template>
  <Transition name="slide">
    <div class="my-carousel-item" v-if="currentIndex === index">
      <slot></slot>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
import { useCarouseInject } from './context'

export default defineComponent({
  name: 'MyCarouselItem',

  setup() {
    const instance = getCurrentInstance()
    const { currentIndex } = useCarouseInject()
    const state = reactive({
      index: instance!.vnode.key,
    })

    console.log('ctx: ', currentIndex)

    return {
      ...toRefs(state),
      currentIndex,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-carousel-item {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.slide-enter-active {
  transition: all 0.3s linear;
}

.slide-leave-active {
  transition: all 0.3s linear
}

.slide-leave-to {
  transform: translateX(-100%);
  // opacity: 0;
}

.slide-enter-from {
  transform: translateX(100%);
}
</style>
