<template>
  <div
    class="my-carousel"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="inner">
      <slot />
    </div>
    <Dots v-if="hasDots" :count="len" />
    <div class="directions">
      <Direction @onClick="handleDirClick" direction="prev" />
      <Direction @onClick="handleDirClick" direction="next" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { useCarouselProvide } from './context'
import Dots from './dots.vue'
import Direction from './direction.vue'

export default defineComponent({
  name: 'MyCarousel',
  components: { Dots, Direction },
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    initial: {
      type: Number,
      default: 0,
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
    hasDirection: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { currentIndex, setCurrentIndex } = useCarouselProvide(props.initial)
    const timeout = ref<any>(null)
    const instance = getCurrentInstance()
    const len = (instance as any).vnode.children.default()[0].children.length
    const autoplay = (direction: 'prev' | 'next') => {
      let newIndex = currentIndex.value
      switch (direction) {
        case 'prev':
          newIndex -= 1
          newIndex === -1 && (newIndex = len - 1)
          break
        case 'next':
          newIndex += 1
          newIndex === len && (newIndex = 0)
          break
      }
      setCurrentIndex(newIndex)
      console.log('newIndex: ', newIndex, len)
    }
    const stop = () => {
      if (!timeout.value) {
        return
      }
      clearInterval(timeout.value)
      timeout.value = null
    }
    const start = () => {
      timeout.value = setInterval(() => autoplay('next'), props.duration)
    }

    const handleMouseEnter = () => {
      stop()
    }
    const handleMouseLeave = () => {
      start()
    }
    const handleDirClick = (dir: 'prev' | 'next') => {
      autoplay(dir)
    }

    onMounted(() => {
      start()
    })

    onBeforeUnmount(() => {
      stop()
    })

    return {
      len,
      handleMouseEnter,
      handleMouseLeave,
      handleDirClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-carousel {
  position: relative;
  .inner {
    position: relative;
    overflow: hidden;
  }
}

.my-carousel,
.inner {
  width: 100%;
  height: 100%;
}

.directions {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
}
</style>
